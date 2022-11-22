from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from pocket.decorator import scrap_decorator
from .serializers import SiteSerializer
from urllib.parse import urlparse
from django.db import transaction
from django.db.models import Q
from .models import Site, User
from bs4 import BeautifulSoup
import requests

# template view

def mylist_view(request):

    """
    mylist/base.html에 모든 항목들 리스트를 전달하는 함수
    """
    if request.method == 'GET': 

        return render(request, 'mylist/base.html')

class HomeView(TemplateView):
    template_name = "common/home.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class SignUpView(TemplateView):
    template_name = "user/signup.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class LogInView(TemplateView):
    template_name = "user/login.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class PwdHelpView(TemplateView):
    template_name = 'user/password.html'

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PremiumView(TemplateView):
    template_name = 'premium/base.html'

    def get_context_data(self, **kwargs):

        context          = super().get_context_data(**kwargs)
        context['login'] = True

        return context


class PaymentView(TemplateView):
    template_name = 'premium/payment.html'

    def get(self, request, *args, **kwargs):

        return super().get(request, *args, **kwargs)



# api view
class SiteAPIView(APIView):
    """
    저장한 모든 항목 데이터들을 api로 쏴주는 함수
    """

    def get(self, request): 
        word: str  = request.GET['word']              
        list_qs    = Site.objects.filter(
                        Q(title__contains=word)|
                        Q(host_name__contains=word))  
        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)



class SiteDetailAPIView(APIView):
    """
    세부 항목 조회, 수정, 삭제 api
    """

    def get_object(self, pk):
        
        return get_object_or_404(Site, pk=pk)


    def get(self, request, pk): 

        site = self.get_object(pk)

        serializer  = SiteSerializer(site)

        return Response(serializer.data)
    

    def put(self, request, pk):
        
        site = self.get_object(pk)

        serializer = SiteSerializer(site, data=request.data, partial=True)
    
        if serializer.is_valid(raise_exception=True):
     
            serializer.save()
            
            return Response({'msg':'Updated successfully'}, status=status.HTTP_202_ACCEPTED)
      
        return Response({'msg': f'{serializer.errors}'})


    def delete(self, request, pk):

        site = self.get_object(pk)
        
        site.delete()
    
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)


class SiteBulkAPIView(APIView):
    """
    벌크 항목 즐겨찾기, 삭제 api
    """

    def delete(self, request):
        pk_ids: list = self.request.data.get('pk_ids')
        
        sites = Site.objects.filter(id__in=pk_ids)

        for site in sites:
            site.delete()
    
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)  


class FavoriteAPIView(APIView):
    """
    Site model의 favorite 값이 true인 data를 api로 만드는 함수
    """

    def get(self, request): 
        list_qs     = Site.objects.filter(favorite=True)  
        
        serializer  = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)



class ArticleAPIView(APIView):
    """
     Site model의 video 값이 false인 data를 api로 만드는 함수
    """

    def get(self, request):
        word: str  = request.GET['word']   
        list_qs    = Site.objects.filter(
                            Q(video=False)&(
                            Q(title__contains=word)|
                            Q(host_name__contains=word)))

        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)


class VideoAPIView(APIView):
    """
     Site model의 video 값이 true인 data를 api로 만드는 함수
    """

    def get(self, request):
        word: str  = request.GET['word'] 
        list_qs    = Site.objects.filter(
                        Q(video=True)&(
                        Q(title__contains=word)|
                        Q(host_name__contains=word)))

        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)

        
class ParseAPIView(APIView):
    @scrap_decorator
    def post(self, request, **kwards):
        result: dict = {}
        video_type, title, image, url = '', '', '', ''
        try:
            # 접근 여부(데코레이터를 통해 반환)
            if kwards['access']:

                request_url: Response   = requests.get(kwards['url'], allow_redirects=False)
                request_url.encoding    = request_url.apparent_encoding
        
                # html 객체로 변환  
                web: BeautifulSoup      = BeautifulSoup(request_url.text, 'html.parser')    
                if web.find("meta", property="og:type"):
                    video_type = web.find("meta", property="og:type")['content']

                if web.find("meta", property="og:url"):
                    url = web.find("meta", property="og:url")['content']

                if web.find("meta", property="og:title"):
                    title = web.find("meta", property="og:title")['content']
                elif web.find("meta", property="og:site_name"):
                    title = web.find("meta", property="og:site_name")['content']

                if web.find("meta", property="og:image"):
                    image = web.find("meta", property="og:image")['content']
                else:
                    image = ''
                
                # title과 url이 없으면 저장 불가
                if title != '' and url != '':
                    content: str = self.parse(web)

                    with transaction.atomic():
                        '''트랜젝션 시작'''

                        user: User = User.objects.filter(name='조정용')
                        
                        if user.exists():
                            user = user.last()

                        site = Site.objects.create(
                            title           = title,
                            user            = user,
                            category        = 0,
                            url             = url,
                            host_name       = urlparse(url).hostname,
                            thumbnail_url   = image,
                            favorite        = False,
                            video           = False if video_type == 'article' or 'website' else True,
                            content         = content
                        )

                    return Response({'msg':'Success save that web site'}, status=status.HTTP_200_OK)

                else:
                    return Response({'msg':'Do not save that web site'}, status=status.HTTP_202_ACCEPTED)

            else:
                return Response({'msg':'Do not access that web site'}, status=status.HTTP_202_ACCEPTED)
                                
        except SyntaxError as s:
            return Response({'msg':f'Save list process SyntaxError that Class ParseAPIView: {s.args}'}, status=status.HTTP_400_BAD_REQUEST)

        except NameError as n:
            return Response({'msg':f'Save list process NameError that Class ParseAPIView : {n.args}'}, status=status.HTTP_400_BAD_REQUEST)
            
        except KeyError as k:
            return Response({'msg':f'Save list process KeyError that Class ParseAPIView : {k.args}'}, status=status.HTTP_400_BAD_REQUEST)

    def parse(self, web: object) -> str:
        ''' 
        html 파싱 
        '''

        try:
            html: str = str(web.main)

        except Exception as e:       
            raise RuntimeError(f'Function parse Exception error that Class ParseAPIView : {e.args}')
        
        return html
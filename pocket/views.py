from django.shortcuts import get_object_or_404, render
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from pocket.decorator import bulk_decorator, scrap_decorator
from .serializers import  SiteSerializer, TagSerializer
from .models import Site, Tag, User, Payment
from urllib.parse import urlparse
from django.db import transaction
from django.db.models import Q
from bs4 import BeautifulSoup
import requests

# template view


def site_detail_view(request, pk):
    """
    mylist/base.html에 각 항목들에 대한 조회 view_url 연결
    """

    if request.method == 'GET': 

        return render(request, 'mylist/detail/detail.html', {'pk' : pk})


def mylist_view(request):
    """
    mylist/base.html과 모든 항목에 대한 조회 view_url을 연결
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
    저장한 모든 항목 데이터 api
    """

    def get(self, request): 
        word: str  = request.GET['word']              
        list_qs    = Site.objects.filter(
                        Q(title__contains=word)|
                        Q(host_name__contains=word))  
        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)

class SiteDetailViewAPIView(APIView):
    """
    항목 상세화면 조회 api
    """

    def get_object(self, pk):
        
        return get_object_or_404(Site, pk=pk)


    def get(self, request, pk): 

        site = self.get_object(pk)

        serializer  = SiteSerializer(site)

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

    @bulk_decorator
    def put(self, request, **kwards):
        """
        Site 벌크 즐겨찾기 추가
        """ 
        try:
            with transaction.atomic():
                '''트랜젝션 시작'''

                for site in kwards['sites']:
                    site.favorite = self.request.data.get('favorite')
                    site.save()
        except:
            raise Response({'msg':'Updated failed'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'msg':'Updated successfully'}, status=status.HTTP_200_OK)

    @bulk_decorator
    def delete(self, request, **kwards):
        """
        Site 벌크 삭제
        """        
        with transaction.atomic():
            '''트랜젝션 시작'''

            for site in kwards['sites']:
                site.delete()
    
        return Response({'msg': 'Deleted successfully'}, status=status.HTTP_200_OK)  

class SiteTagsAPIView(APIView):
    """
    벌크 태그 api
    """

    @bulk_decorator
    def post(self, request, **kwards):
        """
        Site 태그 추가
        """ 
        sites = kwards['sites']
        tags  = self.request.data.get('tags')

        with transaction.atomic():
            '''트랜젝션 시작'''
            
            created_tags = [Tag.objects.get_or_create(name=tag)[0] for tag in tags]

            [tag.site.add(site.id) for tag in created_tags for site in sites]
        
        return Response({'msg':'Add tag successfully'}, status=status.HTTP_200_OK)

class FavoriteAPIView(APIView):
    """
    각 항목의 즐겨찾기 값 수정 api
    """

    def get(self, request): 
        list_qs     = Site.objects.filter(favorite=True)  
        
        serializer  = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)



class ArticleAPIView(APIView):
    """
    video가 아닌 항목 조회 api
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
     video가 포함된 항목 조회 api
    """

    def get(self, request):
        word: str  = request.GET['word'] 
        list_qs    = Site.objects.filter(
                        Q(video=True)&(
                        Q(title__contains=word)|
                        Q(host_name__contains=word)))

        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)

class TagsAPIView(APIView):
    """
     Site model에 Tag model값이 존재하는 것만 조회
    """

    def get(self, request):
        """
        Site 태그 조회
        """ 

        tags       = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)

        return Response(serializer.data)

class SiteByTagAPIView(APIView):
    """
     Site model에 Tag model값이 존재하는 것만 조회
    """

    def get(self, request):
        word: str  = request.GET['word']
        tags: list = [tag for tag in Tag.objects.all()]

        list_qs    = Site.objects.filter(
                        (Q(tag__in=tags))&(
                        Q(title__contains=word)|
                        Q(host_name__contains=word))).order_by('created_at').distinct()

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
                            video           = True if 'video' in video_type else False,
                            content         = content,
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


###### payment #####
class PaymentPassView(APIView):
    """
    생성한 주문번호를 아임포트 결제 창에 전달하는 api
    """

    def post(self, request):

        if not request.user.is_authenticated: 
            return Response({"authenticated": False}, status=401)
        
        amount                  = 100 
        user                    = request.user 
        payment_type            = request.data['type']

        try: 
            merchant_id         = Payment.objects.create_new(
                                    user=user, 
                                    amount=amount,
                                    type=payment_type,
                                  )
        
        except ValueError:
            merchant_id         = None
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if merchant_id is not None:
            data                = {
                                    "works": True, 
                                    "merchant_id": merchant_id,
                                    "amount": amount, 
                                  }
            return Response(data, status=status.HTTP_200_OK)

class PaymentImpStoreView(APIView):
    """
    아임포트에서 보낸 결제번호를 DB에 저장하는 api
    """
    
    def post(self, request):

        if not request.user.is_authenticated: 
            return Response({"authenticated": False}, status=401)

        user                    = request.user
        imp_id                  = request.data['imp_id']
        amount                  = request.data['amount']
        merchant_id             = request.data['merchant_id']
        payment_status          = request.data['payment_status']
        
        payment                 = Payment.objects.get(
                                    user=user,
                                    merchant_id=merchant_id,
                                    amount=amount
                                  )
        
        if payment is not None:
            payment.payment_id  = imp_id 
            payment.status      = payment_status
            payment.save()
            data                = {'works': True}

            return Response(data, status=status.HTTP_200_OK)
        
        else: 
            payment.status      = 'failed'
            payment.save()
            data                = {'works': False}

            return Response(data, {'msg':"Can't find a payment object with merchant_id passed"}, status=status.HTTP_400_BAD_REQUEST)


class MakeStatusFailed(APIView):
    """
    사용자 변심으로 결제 취소 시, payment의 status를 failed로 변경하는 api
    """

    def post(self, request):

        imp_id                      = request.data['imp_id']
        merchant_id                 = request.data['merchant_id']
        payment                     = Payment.objects.get(merchant_id=merchant_id)
        
        if payment is not None: 
            payment.payment_id      = imp_id
            payment.status          = 'failed'
            payment.save()
            data                    = {'works': True}

            return Response(data, status=status.HTTP_200_OK)
        
        else:
            data                    = {'works': False}
            
            return Response(data, {'msg':"Can't find a payment object with merchant_id passed"}, status=status.HTTP_400_BAD_REQUEST)

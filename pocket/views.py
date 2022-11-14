from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from pocket.decorator import scrap_decorator
from .serializers import ListSerializer
from urllib.parse import urlparse
from django.db import transaction
from bs4 import BeautifulSoup
import requests

from .models import List, User

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
        context = super().get_context_data(**kwargs)
        context['login'] = True
        return context


class PaymentView(TemplateView):
    template_name = 'premium/payment.html'

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class MyListView(TemplateView):
    """
    mylist/base.html에 모든 항목들 리스트를 전달하는 함수
    """

    template_name: str = 'mylist/base.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)
        context["lists"] = List.objects.all()
        return context


class ListAPIView(APIView):
    """
    저장한 모든 항목 데이터들을 api로 쏴주는 함수
    """

    def get(self, request): 
        list_qs = List.objects.all()  
        
        serializer = ListSerializer(list_qs, many=True)

        return Response(serializer.data)


class Status():
    OK = 'True'
    NO = 'False'
    ERROR = 'Error'        


class ParseAPIView(APIView):
    @scrap_decorator
    def get(self, request, **kwards):
        result: dict = {}
        video_type: str = ''
        title: str = ''
        image: str = ''
        url: str = ''
        try:
            # 접근 여부(데코레이터를 통해 반환)
            if kwards['access']:

                request_url: object = requests.get(kwards['url'], allow_redirects=False)
                request_url.encoding = request_url.apparent_encoding
        
                # html 객체로 변환  
                web: object = BeautifulSoup(request_url.text, 'html.parser')    
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

                        user: object = User.objects.filter(name='조정용').last()
                        list = List.objects.create(title = title, user = user, category=0)
                        list.url = url
                        list.host_name = urlparse(url).hostname
                        list.thumbnail_url = image
                        list.favorite = False
                        list.video = False if video_type == 'article' else True
                        list.content = content
                        list.save()

                    result['status'] = status.HTTP_200_OK

                else:
                    result['error_message'] = 'Do not save that web site'
                    result['status'] = status.HTTP_202_ACCEPTED

            else:
                result['error_message'] = 'Do not access that web site'
                result['status'] = status.HTTP_202_ACCEPTED
                                
        except SyntaxError as s:
            result['error_message'] = f'Save list process SyntaxError that Class ParseAPIView : {s.args}'
            result['status'] = status.HTTP_400_BAD_REQUEST
        except NameError as n:
            result['error_message'] = f'Save list process NameError that Class ParseAPIView : {n.args}'
            result['status'] = status.HTTP_400_BAD_REQUEST
        except KeyError as k:
            result['error_message'] = f'Save list process KeyError that Class ParseAPIView : {k.args}'
            result['status'] = status.HTTP_400_BAD_REQUEST

        return Response(result)

    def parse(self, web: object) -> str:
        ''' html 파싱 '''
        try:
            html: str = str(web.main)
        except Exception as e:       
            print(f'Function parse Exception error that Class ParseAPIView : {e.args}')
            raise RuntimeError('Function parse Exception error that Class ParseAPIView')
        
        return html
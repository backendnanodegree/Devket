from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SiteSerializer
from .models import Site

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
        context["lists"] = Site.objects.all()
        return context


class SiteAPIView(APIView):
    """
    저장한 모든 항목 데이터들을 api로 쏴주는 함수
    """

    def get(self, request): 
        list_qs = Site.objects.all()  
        
        serializer = SiteSerializer(list_qs, many=True)

        return Response(serializer.data)
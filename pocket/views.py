from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from pocket.serializers import JWTLoginSerializer, JWTSignupSerializer
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
    template_name = 'mylist/base.html'

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class JWTSignupView(APIView):
    serializer_class = JWTSignupSerializer
   
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=False):
            user = serializer.save(request)

            token = RefreshToken.for_user(user)
            refresh = str(token)
            access = str(token.access_token)

            return JsonResponse({'user': user,
                                'access': access,
                                'refresh': refresh
            })
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)

class JWTLoginView(APIView):
    serializer_class = JWTLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=False):
            user = serializer.validated_data['user']
            access = serializer.validated_data['access']
            refresh = serializer.validated_data['refresh']

            return JsonResponse({
                'user': user,
                'access': access,
                'refresh': refresh
            })
        else:
            return JsonResponse({
               'message': 'Invalid Token'
            })
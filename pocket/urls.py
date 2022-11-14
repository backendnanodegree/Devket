from django.contrib import admin
from django.urls import path

from pocket.views import (
    HomeView,
    SignUpView, 
    LogInView, 
    PwdHelpView, 
    PremiumView,
    PaymentView,
    MyListView,
    JWTLoginView,
    JWTSignupView, 
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    
    # user
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LogInView.as_view(), name='login'),
    path('login/password/', PwdHelpView.as_view(), name='password'),
    
    # payment
    path('premium/', PremiumView.as_view(), name='premium'),
    path('premium/payment/', PaymentView.as_view(), name='payment'),

    # mylist
    path('mylist/', MyListView.as_view(), name='mylist'),

    # JWT 회원가입/로그인
    path('jwt/signup/', JWTSignupView.as_view(), name='jwt_signup'),
    path('jwt/login/', JWTLoginView.as_view(), name='jwt_login'),

    # jwt-token
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]
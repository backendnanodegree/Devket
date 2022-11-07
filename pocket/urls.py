from django.contrib import admin
from django.urls import path

from pocket.views import (
    HomeView, 
    SignUpView, 
    LogInView, 
    PwdHelpView, 
    PremiumView,
    PaymentView,
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
]
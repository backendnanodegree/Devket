from django.contrib import admin
from django.urls import path

from pocket.views import HomeView, SignUpView, LogInView, PwdHelpView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LogInView.as_view(), name='login'),
    path('login/password/', PwdHelpView.as_view(), name='password'),
]
from django.contrib import admin
from django.urls import path

from pocket.views import HomeView, Signup

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('signup/', Signup.as_view(), name='signup'),
]
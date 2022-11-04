from django.contrib import admin
from django.urls import path

from pocket.views import HeaderView

urlpatterns = [
    path('', HeaderView.as_view(), name='header')
]
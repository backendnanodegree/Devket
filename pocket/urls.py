from django.contrib import admin
from django.urls import path

from pocket.views import BaseView

urlpatterns = [
    path('', BaseView.as_view()),
]
from django.contrib import admin
from django.urls import path

from pocket.views import FooterView

urlpatterns = [
    path('', FooterView.as_view()),
]
from django.contrib import admin
from django.urls import path

from pocket.views import HomeView

urlpatterns = [
    path('', HomeView.as_view()),
]
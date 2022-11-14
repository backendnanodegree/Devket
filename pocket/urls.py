from django.contrib import admin
from django.urls import path, include

from pocket.views import (
    HomeView,
    ParseAPIView, 
    SignUpView, 
    LogInView, 
    PwdHelpView, 
    PremiumView,
    PaymentView,
    MyListView,
    ListAPIView,
)


api_patterns = [
    path('list/', ListAPIView.as_view()),
    path('scrap/parse/', ParseAPIView.as_view()),
]

urlpatterns = [
    path('', HomeView.as_view(), name='home'),

    # user
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LogInView.as_view(), name='login'),
    path('login/password/', PwdHelpView.as_view(), name='password'),

    #mylist
    path('mylist/', MyListView.as_view(), name='mylist'), 

    # payment
    path('premium/', PremiumView.as_view(), name='premium'),
    path('premium/payment/', PaymentView.as_view(), name='payment'),

    # api
    path('api/', include(api_patterns)),
]
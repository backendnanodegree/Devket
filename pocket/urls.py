from django.contrib import admin
from django.urls import path, include

from pocket.views import (
    HomeView, 
    SignUpView, 
    LogInView, 
    PwdHelpView, 
    PremiumView,
    PaymentView,
    MyListView,
    SiteAPIView,
    FavoriteAPIView, 
    ArticleAPIView, 
    VideoAPIView,

)

api_patterns = [
    path('sites/', SiteAPIView.as_view(), name='sites_api'),
    path('favorites/', FavoriteAPIView.as_view(), name='favorite_api'),
    path('articles/', ArticleAPIView.as_view(), name='article_api'),
    path('videos/', VideoAPIView.as_view(), name='video_api'),
]

urlpatterns = [
    path('', HomeView.as_view(), name='home'),

    # user
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LogInView.as_view(), name='login'),
    path('login/password/', PwdHelpView.as_view(), name='password'),

    #mylist
    path('mylist/', MyListView.as_view(), name='mylist'), 
    path('mylist/favorites/', MyListView.as_view(), name='favorites'), 
    path('mylist/articles/', MyListView.as_view(), name='articles'), 
    path('mylist/videos/', MyListView.as_view(), name='videos'), 

    # payment
    path('premium/', PremiumView.as_view(), name='premium'),
    path('premium/payment/', PaymentView.as_view(), name='payment'),

    # api
    path('api/', include(api_patterns)),

]
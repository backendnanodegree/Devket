from django.contrib import admin
from django.urls import path, include

from pocket.views import (
    # api_view
    ParseAPIView,
    SiteAPIView,
    SiteBulkAPIView,
    SiteTagsAPIView, 
    SiteDetailAPIView,
    FavoriteAPIView, 
    ArticleAPIView,
    TagsAPIView, 
    VideoAPIView,

    # template_view
    HomeView,
    mylist_view, 
    SignUpView, 
    LogInView, 
    PwdHelpView, 
    PremiumView,
    PaymentView,

)

api_patterns = [
    path('scrap/parse', ParseAPIView.as_view()), 
    path('sites', SiteAPIView.as_view()),
    path('sites/<int:pk>', SiteDetailAPIView.as_view()),
    path('sites/bulk', SiteBulkAPIView.as_view()), 
    path('sites/tags', SiteTagsAPIView.as_view()), 
    path('favorites', FavoriteAPIView.as_view()),
    path('articles', ArticleAPIView.as_view()),
    path('videos', VideoAPIView.as_view()),
    path('tags', TagsAPIView.as_view()),
]

urlpatterns = [
    path('', HomeView.as_view(), name='home'),

    # user
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LogInView.as_view(), name='login'),
    path('login/password/', PwdHelpView.as_view(), name='password'),

    # mylist
    path('mylist/', mylist_view, name='mylist'), 
    path('mylist/favorites/', mylist_view, name='favorites'), 
    path('mylist/articles/', mylist_view, name='articles'), 
    path('mylist/videos/', mylist_view, name='videos'),
    path('mylist/tags/', mylist_view, name='tags'),
     
    # payment
    path('premium/', PremiumView.as_view(), name='premium'),
    path('premium/payment/', PaymentView.as_view(), name='payment'),

    # api
    path('api/', include(api_patterns)),
]
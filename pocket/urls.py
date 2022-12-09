from django.contrib import admin
from django.urls import path, include

from pocket.views import (
    # api_view
    ParseAPIView,
    SiteAPIView,
    SiteBulkAPIView,
    SiteDetailAPIView,
    FavoriteAPIView, 
    ArticleAPIView, 
    VideoAPIView,
    SiteDetailViewAPIView,
    HighlightListAPIView,
    HighlightAPIView,
    HighlightPremiumAPIView,

    # template_view
    HomeView,
    mylist_view, 
    SignUpView, 
    LogInView, 
    PwdHelpView, 
    PremiumView,
    PaymentView,
    site_detail_view

)

api_patterns = [
    path('scrap/parse', ParseAPIView.as_view()), 
    path('sites', SiteAPIView.as_view()),
    path('sites/<int:pk>', SiteDetailAPIView.as_view()),
    path('sites/bulk', SiteBulkAPIView.as_view()), 
    path('sites/detail/<int:pk>',SiteDetailViewAPIView.as_view()),
    path('favorites', FavoriteAPIView.as_view()),
    path('articles', ArticleAPIView.as_view()),
    path('videos', VideoAPIView.as_view()),
    path('highlights', HighlightAPIView.as_view()),
    path('highlights/<int:pk>', HighlightAPIView.as_view()),
    path('highlights/list', HighlightListAPIView.as_view()),
    path('highlights/premium/<int:pk>', HighlightPremiumAPIView.as_view()),

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
    path('mylist/highlights/', mylist_view, name='highlights'),

    # detail
    path('mylist/detail/<int:pk>/', site_detail_view, name='site_detail_view'), 

    # payment
    path('premium/', PremiumView.as_view(), name='premium'),
    path('premium/payment/', PaymentView.as_view(), name='payment'),

    # api
    path('api/', include(api_patterns)),
]
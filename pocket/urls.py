from django.urls import path, include

from pocket.views import (
    # api_view
    LoginAPIView,
    LogoutAPIView,
    ParseAPIView,
    SignupAPIView,
    SiteAPIView,
    SiteBulkAPIView,
    SiteByTagAPIView,
    SiteTagsAPIView, 
    SiteDetailAPIView,
    FavoriteAPIView, 
    ArticleAPIView,
    TagsAPIView, 
    VideoAPIView,
    SiteDetailViewAPIView,
    PaymentPassView, 
    PaymentImpStoreView, 
    PaymentFailedView,
    HighlightListAPIView,
    HighlightAPIView,
    HighlightPremiumAPIView,

    # template_view
    HomeView,
    LogInView, 
    SignUpView, 
    PwdHelpView, 
    PremiumView,
    SiteView, 
    site_detail_view,
)

api_patterns = [
    path('scrap/parse', ParseAPIView.as_view()), 

    path('sites', SiteAPIView.as_view()),
    path('sites/<int:pk>', SiteDetailAPIView.as_view()),
    path('sites/bulk', SiteBulkAPIView.as_view()),
    path('sites/detail/<int:pk>',SiteDetailViewAPIView.as_view()),
    path('sites/tags', SiteTagsAPIView.as_view()), 
    path('sites/tags/<int:pk>', SiteTagsAPIView.as_view()),
    path('favorites', FavoriteAPIView.as_view()),
    path('articles', ArticleAPIView.as_view()),
    path('videos', VideoAPIView.as_view()),
    path('tags', TagsAPIView.as_view()),
    path('tags/sites', SiteByTagAPIView.as_view()),  
    path('signup', SignupAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('highlights', HighlightAPIView.as_view()),
    path('highlights/<int:pk>', HighlightAPIView.as_view()),
    path('highlights/list', HighlightListAPIView.as_view()),
    path('highlights/premium/<int:pk>', HighlightPremiumAPIView.as_view()),

    # payment
    path('payment/checkout', PaymentPassView.as_view()),
    path('payment/validation', PaymentImpStoreView.as_view()),
    path('payment/failure', PaymentFailedView.as_view()),
]

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('home/', HomeView.as_view(), name='home'),

    # user
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LogInView.as_view(), name='login'),
    path('login/password/', PwdHelpView.as_view(), name='password'),

    # mylist
    path('mylist/', SiteView.as_view(), name='mylist'), 
    path('mylist/favorites/', SiteView.as_view(), name='favorites'), 
    path('mylist/articles/', SiteView.as_view(), name='articles'), 
    path('mylist/videos/', SiteView.as_view(), name='videos'),
    path('mylist/tags/', SiteView.as_view(), name='tags'),
    path('mylist/highlights/', SiteView.as_view(), name='highlights'),

    # detail
    path('mylist/detail/<int:pk>/', site_detail_view, name='site_detail_view'), 
     
    # payment
    path('premium/', PremiumView.as_view(), name='premium'),

    # api
    path('api/', include(api_patterns)),
]

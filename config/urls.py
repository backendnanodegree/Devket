from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # poket url patterns
    path('', include('pocket.urls'))
]

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapi.views import CompanyViewSet

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
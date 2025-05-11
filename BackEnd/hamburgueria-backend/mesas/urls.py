from rest_framework.routers import DefaultRouter
from .views import MesaViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', MesaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
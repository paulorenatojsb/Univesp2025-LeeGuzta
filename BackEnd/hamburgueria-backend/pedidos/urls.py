from rest_framework.routers import DefaultRouter
from .views import PedidoViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', PedidoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
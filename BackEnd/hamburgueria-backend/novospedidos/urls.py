from django.urls import path
from .views import NovoPedidoView

urlpatterns = [
    path('', NovoPedidoView.as_view(), name='novo_pedido'),
]
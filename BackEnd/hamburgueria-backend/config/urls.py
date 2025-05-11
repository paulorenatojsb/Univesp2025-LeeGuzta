from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cardapio/', include('menu.urls')),
    path('api/estoque/', include('inventory.urls')),
    path('api/mesas/', include('mesas.urls')),
    path('api/config/', include('configuracao.urls')),
    path('api/usuarios/', include('users.urls')),
    path('api/pedidos/', include('pedidos.urls')),
    path('api/cria-pedido/', include('novospedidos.urls')),
]
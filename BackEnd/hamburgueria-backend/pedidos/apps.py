from django.apps import AppConfig

class PedidosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pedidos'
    label = 'pedidos'  # 👈 Esse label precisa ser único no projeto!
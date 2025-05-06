from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from menu.models import MenuItem
from .models import Pedido, ItemPedido

class NovoPedidoView(APIView):
    def post(self, request):
        mesa = request.data.get('mesa')
        itens = request.data.get('itens', [])

        if not mesa or not itens:
            return Response({'erro': 'Mesa e itens são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        pedido = Pedido.objects.create(mesa=mesa)
        for item in itens:
            try:
                menu_item = MenuItem.objects.get(id=item['id'])
                quantidade = item.get('quantidade', 1)
                ItemPedido.objects.create(pedido=pedido, item=menu_item, quantidade=quantidade)
            except MenuItem.DoesNotExist:
                continue

        return Response({'mensagem': 'Pedido criado com sucesso.', 'pedido_id': pedido.id}, status=status.HTTP_201_CREATED)
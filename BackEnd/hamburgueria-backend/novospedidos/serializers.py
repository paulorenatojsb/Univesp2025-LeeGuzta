from rest_framework import serializers
from .models import Pedido, ItemPedido
from menu.models import MenuItem


class ItemPedidoSerializer(serializers.ModelSerializer):
    item_nome = serializers.ReadOnlyField(source='item.nome')  # útil para leitura

    class Meta:
        model = ItemPedido
        fields = ['id', 'item', 'item_nome', 'quantidade']


class PedidoSerializer(serializers.ModelSerializer):
    itens = ItemPedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'mesa', 'criado_em', 'itens']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')
        pedido = Pedido.objects.create(**validated_data)
        for item_data in itens_data:
            ItemPedido.objects.create(pedido=pedido, **item_data)
        return pedido
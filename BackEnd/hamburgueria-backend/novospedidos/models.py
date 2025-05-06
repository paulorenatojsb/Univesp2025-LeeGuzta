from django.db import models
from menu.models import MenuItem

class Pedido(models.Model):
    mesa = models.CharField(max_length=20)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Mesa {self.mesa} - {self.criado_em.strftime("%d/%m %H:%M")}'


class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='itens', on_delete=models.CASCADE)
    item = models.ForeignKey(MenuItem, related_name='itempedido_novos', on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.quantidade}x {self.item.nome}'
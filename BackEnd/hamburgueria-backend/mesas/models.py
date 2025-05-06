from django.db import models

class Mesa(models.Model):
    numero = models.PositiveIntegerField(unique=True)
    STATUS_CHOICES = [
        ('livre', 'Livre'),
        ('ocupada', 'Ocupada'),
        ('reservada', 'Reservada'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='livre')
    criada_em = models.DateTimeField(auto_now_add=True)
    atualizada_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Mesa {self.numero} - {self.status.capitalize()}"
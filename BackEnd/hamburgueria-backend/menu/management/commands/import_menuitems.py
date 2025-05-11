import pandas as pd
from django.core.management.base import BaseCommand
from menu.models import MenuItem # ajuste conforme o nome do seu app
from django.utils.timezone import now

class Command(BaseCommand):
    help = "Importa itens do menu a partir de um arquivo Excel"

    def handle(self, *args, **kwargs):
        file_path = 'BancoDeDados/files/menuitem.xlsx'
        df = pd.read_excel(file_path)

        for _, row in df.iterrows():
            item, created = MenuItem.objects.update_or_create(
                id=row['Id'],
                defaults={
                    'nome': row['Nome'],
                    'descricao': row['Descricao'],
                    'preco': row['Preco'],
                    'imagem': row['Imagem'] if not pd.isna(row['Imagem']) else None,
                    'categoria': row['Categoria'],
                    'disponivel': bool(row['Disponivel']) if not pd.isna(row['Disponivel']) else True,
                }
            )
            action = "Criado" if created else "Atualizado"
            self.stdout.write(f"{action}: {item.nome}")
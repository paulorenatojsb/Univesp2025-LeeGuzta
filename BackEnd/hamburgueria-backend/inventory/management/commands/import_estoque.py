import pandas as pd
from decimal import Decimal
from django.core.management.base import BaseCommand
from inventory.models import EstoqueItem

class Command(BaseCommand):
    help = "Importa dados de estoque a partir de um arquivo CSV"

    def handle(self, *args, **kwargs):
        file_path = 'BancoDeDados/files/estoque_hamburgueria.csv'
        df = pd.read_csv(file_path, encoding='cp1252')

        for _, row in df.iterrows():
            item, created = EstoqueItem.objects.update_or_create(
                nome=row['Nome'],
                defaults={
                    'quantidade': Decimal(str(row['Quantidade'])) if not pd.isna(row['Quantidade']) else Decimal('0'),
                    'unidade': row['Unidade'] if not pd.isna(row['Unidade']) else 'unid',
                    'status': row['Status'] if not pd.isna(row['Status']) else 'OK',
                }
            )
            self.stdout.write(f"{'Criado' if created else 'Atualizado'}: {item.nome}")

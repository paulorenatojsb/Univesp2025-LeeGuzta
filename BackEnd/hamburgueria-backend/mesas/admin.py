from django.contrib import admin
from .models import Mesa

@admin.register(Mesa)
class MesaAdmin(admin.ModelAdmin):
    list_display = ['numero', 'status', 'criada_em', 'atualizada_em']
    list_filter = ['status']
    search_fields = ['numero']
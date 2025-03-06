from django.contrib import admin
from .models import Usuario  # Importar el modelo

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'correo_electronico', 'telefono')  # Campos visibles en la tabla
    search_fields = ('nombre', 'correo_electronico')  # Habilita la búsqueda
    list_filter = ('nombre',)  # Agrega filtros por nombre

# Alternativa sin decorador:
# admin.site.register(Usuario, UsuarioAdmin)

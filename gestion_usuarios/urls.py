from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect
from .views import exportar_csv  # Importa la vista de exportación

urlpatterns = [
    path('', lambda request: HttpResponseRedirect('/api/')),  # Redirige la raíz a /api/
    path('admin/', admin.site.urls),
    path('api/', include('usuarios.urls')),  # Incluye las rutas de usuarios
    path('exportar-csv/', exportar_csv, name='exportar_csv'),  # Ruta para exportar CSV
]

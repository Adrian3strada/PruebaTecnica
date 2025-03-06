# usuarios/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, exportar_csv  # Asegúrate de importar correctamente

# Configura el router para el viewset
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Para que el viewset esté disponible en la URL
    path('exportar-csv/', exportar_csv, name='exportar_csv'),  # Ruta para exportar CSV
]

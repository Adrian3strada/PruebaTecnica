# usuarios/views.py

from django.http import HttpResponse
from rest_framework import generics, viewsets
from .models import Usuario
from .serializers import UsuarioSerializer
import csv

# Vista para exportar usuarios a CSV
def exportar_csv(request):
    usuarios = Usuario.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=usuarios.csv'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Nombre', 'Correo Electrónico', 'Teléfono'])  # Cabeceras del CSV

    for usuario in usuarios:
        writer.writerow([usuario.id, usuario.nombre, usuario.correo_electronico, usuario.telefono])

    return response

# Vista para crear un usuario utilizando un ViewSet
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


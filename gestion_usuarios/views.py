# gestion_usuarios/views.py

from django.http import HttpResponse
import csv
from usuarios.models import Usuario

def exportar_csv(request):
    usuarios = Usuario.objects.all()

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=usuarios.csv'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Nombre', 'Correo Electrónico', 'Teléfono'])

    for usuario in usuarios:
        writer.writerow([usuario.id, usuario.nombre, usuario.correo_electronico, usuario.telefono])

    return response

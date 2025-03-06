from django.http import JsonResponse
from django.contrib.auth.models import User

class VerificarRolesMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Verificar si el usuario tiene el rol adecuado
        user = request.user
        if user.is_authenticated and not user.is_staff:
            return JsonResponse({"error": "Acceso no permitido"}, status=403)
        return self.get_response(request)

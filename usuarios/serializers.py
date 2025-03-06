from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Se usa 'password' en vez de 'contraseña'

    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'correo_electronico', 'telefono', 'password']  # 'password' aquí

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # Encripta la contraseña
        return Usuario.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        # Si la contraseña fue proporcionada, la encriptamos
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
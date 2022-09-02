from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Profile


class ProfileSerializer(ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = ('full_name', 'job_title', 'phone', 'email', 'image', 'url')

from rest_framework.serializers import  ModelSerializer

from .models import Project, Image


class ProjectSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'name', 'link', 'description', 'url')


class ImageSerializer(ModelSerializer):

    class Meta:
        model = Image
        fields = ('id', 'project', 'image')

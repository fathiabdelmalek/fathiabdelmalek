from email.mime import image
from django.utils.translation import gettext as _

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Image, Project
from .serializers import ImageSerializer, ProjectSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def create(self, request, *args, **kwargs):
        try:
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter the project name")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                for i in self.request.data.images:
                    Image.objects.create(project=self.request.data.id, image=self.request.data.images[i])
                return self.perform_create(serializer)
            return Response({_('data_error'): _("Invalid data")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when creating the project\n") + e})

    def perform_create(self, serializer):
        serializer.save()
        # image = Image.objects.create(project=project)
        return Response({_('success'): _("Project created successfully"), 'id': serializer.data['id']})

    def partial_update(self, request, *args, **kwargs):
        try:
            project = self.get_object()
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter the project name")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                serializer.update(project, self.request.data)
                return Response({_('success'): _("Project updated successfully")})
            return Response({_('data_error'): _("Invalid data")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when updating this project\n") + e})


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

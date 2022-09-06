from django.utils.translation import gettext as _

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # name, description, likes, image

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def partial_update(self, request, *args, **kwargs):
        try:
            project = self.get_object()
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter the project name")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                serializer.update(project, self.request.data)
                return Response({_('success'): _("Project updated successfully")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when updating this project\n") + e})

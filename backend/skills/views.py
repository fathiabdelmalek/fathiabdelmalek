from django.utils.translation import gettext as _

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def create(self, request, *args, **kwargs):
        try:
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter the skill name")})
            if not request.data['value']:
                return Response({_('value_error'): _("You must enter a valid number for the skill value")})
            value = request.data['value']
            if int(value) > 100 or int(value) < 10:
                return Response({_('value_error'): _("The value must be a number between 10 and 100")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                return self.perform_create(serializer)
            return Response({_('data_error'): _("Invalid data")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when creating the skill\n") + e})

    def perform_create(self, serializer):
        serializer.save()
        return Response({_('success'): _("Skill created successfully")})

    def update(self, request, *args, **kwargs):
        try:
            skill = self.get_object()
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter the skill name")})
            if not request.data['value']:
                return Response({_('value_error'): _("You must enter a valid number for the skill value")})
            value = request.data['value']
            if int(value) > 100 or int(value) < 10:
                return Response({_('value_error'): _("The value must be a number between 10 and 100")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                serializer.update(skill, self.request.data)
                return Response({_('success'): _("Skill updated successfully")})
            return Response({_('data_error'): _("Invalid data")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when updating the skill\n") + e})

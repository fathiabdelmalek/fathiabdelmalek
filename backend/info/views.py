from django.utils.translation import gettext as _

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def create(self, request, *args, **kwargs):
        return Response({_('Error'): _("You can't create another profile")})

    def update(self, request, *args, **kwargs):
        try:
            profile = self.get_object()
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter your name")})
            if not request.data['job_title']:
                return Response({_('job_title_error'): _("You must enter your job title")})
            if not request.data['phone']:
                return Response({_('phone_error'): _("You must enter your phone number")})
            if not request.data['image']:
                return Response({_('image_error'): _("You must put an image")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                serializer.update(profile, self.request.data)
                return Response({_('success'): _("Profile updated successfully")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when updating your profile\n") + e})

    def partial_update(self, request, *args, **kwargs):
        try:
            profile = self.get_object()
            if not request.data['name']:
                return Response({_('name_error'): _("You must enter your name")})
            if not request.data['job_title']:
                return Response({_('job_title_error'): _("You must enter your job title")})
            if not request.data['phone']:
                return Response({_('phone_error'): _("You must enter your phone number")})
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                serializer.update(profile, self.request.data)
                return Response({_('success'): _("Profile updated successfully")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when updating your profile\n") + e})

    def destroy(self, request, *args, **kwargs):
        return Response({_('Error'): _("You can't delete this profile")})

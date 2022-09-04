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

    def destroy(self, request, *args, **kwargs):
        return Response({_('Error'): _("You can't delete this profile")})

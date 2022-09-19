from django.utils.translation import gettext as _

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'partial_update' or self.action == 'destroy':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def partial_update(self, request, *args, **kwargs):
        try:
            profile = self.get_object()
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                serializer.update(profile, self.request.data)
                return Response({_('success'): _("Profile partially updated successfully")})
            return Response({_('data_error'): _("Invalid data")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when updating your profile\n") + e})

    def destroy(self, request, *args, **kwargs):
        return Response({_('Error'): _("You can't delete this profile")})

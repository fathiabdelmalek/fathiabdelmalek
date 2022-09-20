from django.contrib import auth
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.utils.translation import gettext as _
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        return Response({_('Error'): _("You can't create another user")})

    def destroy(self, request, *args, **kwargs):
        return Response({_('Error'): _("You can't delete this user")})


class IsAuthenticated(APIView):

    def get(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            return Response({'isAuthenticated': "Yes"})
        return Response({'isAuthenticated': "No"})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):

    def get(self, request, format=None):
        return Response({'success': "CSRF Token cookie set"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):

    def post(self, request, format=None):
        try:
            if not request.data['email']:
                return Response({_('email_error'): _("You must enter the email")})
            if not request.data['password']:
                return Response({_('password_error'): _("You must enter the password")})
            email = request.data['email']
            password = request.data['password']
            if User.objects.filter(email=email):
                user = User.objects.filter(email=email)[0]
                if user.check_password(password):
                    auth.login(request, user)
                    return Response({_('success'): _("Login successfully")})
                return Response({_('password_error'): _("Incorrect password")})
            return Response({_('email_error'): _("Incorrect email")})
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when logging in\n") + e})


class LogoutView(APIView):

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({_('success'): _("Logout successfully")})
        except Exception as e:
            return Response({_('Error'): _(f"Something went wrong when loging out\n") + e})

from django.utils.translation import gettext as _
from django.core.mail import send_mail, mail_admins

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        try:
            if not request.data['email']:
                return Response({_('email_error'): _("You must enter the email")}, status=status.HTTP_400_BAD_REQUEST)
            if not request.data['body']:
                return Response({_('message_error'): _("You should enter message body")}, status=status.HTTP_400_BAD_REQUEST)
            serializer = self.get_serializer(data=self.request.data)
            if serializer.is_valid():
                return self.perform_create(serializer)
        except Exception as e:
            return Response({_('error'): _(f"Something went wrong when sending the message\n") + e})

    def perform_create(self, serializer):
        message = serializer.save()
        title = f"Message from : {message.email}"
        send_mail(
            title,
            message.body,
            message.email,
            ['abdelmalek.fathi.2001@gmail.com']
        )
        return Response({_('success'): _("Message sent successfully")}, status=status.HTTP_200_OK)

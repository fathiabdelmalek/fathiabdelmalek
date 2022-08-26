from django.db import models


class Message(models.Model):
    email = models.EmailField(verbose_name='client email', max_length=254, blank=False, null=False)
    body = models.TextField(verbose_name='message body', blank=True, null=True)

    def __str__(self):
        return f"Message from {self.email}"

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'

from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(verbose_name='name', max_length=30, null=True, blank=True)
    job_title = models.CharField(verbose_name='job title', max_length=100, null=True, blank=True)
    phone = models.CharField(verbose_name='phone number', max_length=15, null=True, blank=True)
    image = models.ImageField(verbose_name='profile image', null=True, blank=True, upload_to='images')

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

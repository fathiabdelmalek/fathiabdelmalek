from django.db import models


class Skill(models.Model):
    name = models.CharField(verbose_name='skill name', max_length=30)
    value = models.IntegerField(verbose_name='skill value')

    class Meta:
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'

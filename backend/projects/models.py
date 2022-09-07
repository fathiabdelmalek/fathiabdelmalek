from django.db import models


class Project(models.Model):
    name = models.CharField(verbose_name='project name', max_length=100)
    description = models.TextField(verbose_name='project description', max_length=2500, null=True, blank=True)
    likes = models.IntegerField(verbose_name='number of likes', default=1)
    image = models.FileField(verbose_name='project image', default='images/notfound.jpg', upload_to='images')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

# Generated by Django 4.1 on 2022-09-05 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0004_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images', verbose_name='profile image'),
        ),
    ]
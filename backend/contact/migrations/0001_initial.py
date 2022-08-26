# Generated by Django 4.1 on 2022-08-26 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='client email')),
                ('title', models.CharField(blank=True, max_length=254, null=True, verbose_name='message title')),
                ('body', models.TextField(blank=True, null=True, verbose_name='message body')),
            ],
            options={
                'verbose_name': 'Message',
                'verbose_name_plural': 'Messages',
            },
        ),
    ]

from django.urls import path

from .views import index


urlpatterns = [
    path('', index, name='home'),
    path('about/', index, name='about'),
    path('skills/', index, name='skills'),
    path('projects/', index, name='projects'),
    path('contact/', index, name='contact'),
]

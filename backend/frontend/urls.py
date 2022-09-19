from django.urls import path

from .views import index


urlpatterns = [
    path('', index, name='home'),
    path('about/', index, name='about'),
    path('skills/', index, name='skills'),
    path('projects/', index, name='projects'),
    path('project/<int>', index, name='project'),
    path('contact/', index, name='contact'),
    # authentication
    path('login/', index, name='login'),
    path('logout/', index, name='logout'),
    # settings
    path('settings/', index),
    path('settings/profile', index),
    path('settings/skills', index),
    path('settings/projects', index),
    path('settings/projects/<int>', index),
    path('settings/projects/new', index),
]

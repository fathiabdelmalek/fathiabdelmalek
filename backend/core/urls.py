# from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter

from admin.views import UserViewSet
from info.views import ProfileViewSet
from projects.views import ProjectViewSet
from skills.views import SkillViewSet


router = DefaultRouter()
router.register('users', UserViewSet)
router.register('profiles', ProfileViewSet)
router.register('projects', ProjectViewSet)
router.register('skills', SkillViewSet, basename='skill')

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/admin/', include('admin.urls')),
    path('', include('frontend.urls')),
    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from rest_framework.serializers import ModelSerializer

from .models import Skill


class SkillSerializer(ModelSerializer):

    class Meta:
        model = Skill
        fields = ('id', 'name', 'value', 'url')

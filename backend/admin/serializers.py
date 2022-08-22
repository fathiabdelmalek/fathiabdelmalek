from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer


User = get_user_model()


class UserSerializer(ModelSerializer):

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance

    class Meta:
        model = User
        fields = ('email', 'password', 'last_login', 'url')
        read_only_field = 'email'
        extra_kwargs = {'password': {'write_only': True}}

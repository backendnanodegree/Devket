from rest_framework_simplejwt.tokens      import RefreshToken
from rest_framework.serializers           import ModelSerializer
from rest_framework                       import serializers
from .models                              import Site, Tag, Payment, User, Highlight
import jwt,datetime
from config.settings import SIMPLE_JWT 
class LoginSerializer(serializers.ModelSerializer):
    email                   = serializers.CharField(
        required            = True,
        write_only          = True,
    )
    password                = serializers.CharField(
        required            = True,
        write_only          = True,
        style               = {'input_type' : 'password'}
    )

    def validate(self, data):
        email               = data.get('email', None)
        password            = data.get('password', None)

        if User.objects.filter(email=email).exists():
            user            = User.objects.get(email=email)

            if not user.check_password(password):
                raise serializers.ValidationError('Check Your Email or Password')
        else:
            raise serializers.ValidationError("User does not exist")
        
        token               = RefreshToken.for_user(user=user)
        data                = {
                                'refresh_token' : str(token),
                                'access_token'  : str(token.access_token)
                              }
        
        return data
        
        
    class Meta(object):
        model               = User
        fields              = ['email', 'password']


class TagSerializer(ModelSerializer):

    name                    = serializers.CharField(max_length=20, allow_blank=False, trim_whitespace=True)
    class Meta:
        model               = Tag
        fields              = ['id', 'name']


class SiteSerializer(ModelSerializer):

    CATEGORY_CHOICES        = [(1, 'python'), (2, 'django'), (3, 'javascript'), (4, 'orm'), (5, 'mysql'), (6, 'drf'), (7, 'docker'), (8, 'os'), (9, 'aws'), (10, 'html'), (11, 'css'), (12, 'git'), (13, 'linux')]

    title                   = serializers.CharField(max_length=100, allow_blank=False, trim_whitespace=True)
    thumbnail_url           = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
    host_name               = serializers.CharField(max_length=30, allow_blank=False, trim_whitespace=True)
    content                 = serializers.CharField(max_length=2000, allow_blank=True)
    category                = serializers.ChoiceField(choices=CATEGORY_CHOICES)
    user                    = serializers.CharField(max_length=10, allow_blank=False, trim_whitespace=True)
    favorite                = serializers.BooleanField(default=False)
    video                   = serializers.BooleanField(default=False)
    
    def create(self, validated_data):
        return Site.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.category   = validated_data.get('category', instance.category)
        instance.favorite   = validated_data.get('favorite', instance.favorite)
        instance.video      = validated_data.get('video'   , instance.video)
        instance.save()
        return instance    

    class Meta:
        model               = Site
        fields              = ['id','title', 'thumbnail_url', 'host_name', 'content', 'category', 'user', 'favorite', 'video', 'url']


class PaymentSerializer(ModelSerializer):

    PAYMENT_TYPE_CHOICES    = [('card', '신용카드')]
    STATUS_CHOICES          = [
                                ('await', '결제대기'),
                                ('paid', '결제성공'),
                                ('failed', '결제실패'),
                                ('cancelled', '결제취소')
                              ]

    user                    = serializers.CharField(max_length=10, allow_blank=False, trim_whitespace=True)
    amount                  = serializers.IntegerField(max_value=50000, min_value=100)
    payment_id              = serializers.CharField(max_length=20, allow_blank=False, trim_whitespace=True)
    merchant_id             = serializers.CharField(max_length=10, allow_blank=False, trim_whitespace=True)
    payment_data            = serializers.DateTimeField()
    status                  = serializers.ChoiceField(choices=STATUS_CHOICES) 
    type                    = serializers.ChoiceField(choices=PAYMENT_TYPE_CHOICES)


    class Meta: 
        model = Payment
        fields = ['user', 'amount', 'payment_id', 'merchant_id', 'works', 'payment_data', 'status', 'type']


class HighlightSerializer(serializers.ModelSerializer):

    content_text            = serializers.CharField(max_length=2000, allow_blank=False, trim_whitespace=True)
    content_location        = serializers.JSONField(default=dict)
    class Meta:
        model               = Highlight
        fields              = '__all__'

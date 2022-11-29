from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Site, Highlight

class SiteSerializer(ModelSerializer):

    CATEGORY_CHOICES = [(1, 'python'), (2, 'django'), (3, 'javascript'), (4, 'orm'), (5, 'mysql'), (6, 'drf'), (7, 'docker'), (8, 'os'), (9, 'aws'), (10, 'html'), (11, 'css'), (12, 'git'), (13, 'linux')]

    title = serializers.CharField(max_length=100, allow_blank=False, trim_whitespace=True)
    thumbnail_url = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
    host_name = serializers.CharField(max_length=30, allow_blank=False, trim_whitespace=True)
    content = serializers.CharField(max_length=2000, allow_blank=True)
    category = serializers.ChoiceField(choices=CATEGORY_CHOICES)
    user = serializers.CharField(max_length=10, allow_blank=False, trim_whitespace=True)
    favorite = serializers.BooleanField(default=False)
    video = serializers.BooleanField(default=False)
    
    
    def create(self, validated_data):
        return Site.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.category = validated_data.get('category', instance.category)
        instance.favorite = validated_data.get('favorite', instance.favorite)
        instance.video = validated_data.get('video', instance.video)
        instance.save()
        return instance    

    class Meta:
        model = Site
        exclude = ["created_at", "updated_at"]




class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = '__all__'

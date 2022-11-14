from rest_framework import serializers
from pocket.models import Highlight

class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = '__all__'

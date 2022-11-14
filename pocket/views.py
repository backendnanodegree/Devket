from django.shortcuts import render
from rest_framework.response import Response
from pocket.models import Highlight
from rest_framework.views import APIView
from pocket.serializers import HighlightSerializer
from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.shortcuts import redirect
from django.http import Http404
from rest_framework import status

class HighlightView(TemplateView):
    template_name = 'base.html'

    def get(self, *args, **kwargs):
        response = super(HighlightView, self).get(self, *args, **kwargs)
        return response



class HighlightListAPI(APIView):
    def get(self, request):
        print('getfunction')
        queryset = Highlight.objects.all()
        print(queryset)
        serializer = HighlightSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        print('postfunction')
        serializer = HighlightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


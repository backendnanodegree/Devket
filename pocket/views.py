from django.shortcuts import render
from django.views.generic import TemplateView
class HeaderView(TemplateView):
    template_name = "header.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

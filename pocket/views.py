from django.shortcuts import render
from django.views.generic import TemplateView
class BaseView(TemplateView):
    template_name = "base.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

from django.shortcuts import render
from django.views.generic import TemplateView
class FooterView(TemplateView):
    template_name = "footer.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

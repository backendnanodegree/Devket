from django.shortcuts import render
from django.views.generic import TemplateView
class HomeView(TemplateView):
    template_name = "common/home.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class SignUpView(TemplateView):
    template_name = "user/signup.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class LogInView(TemplateView):
    template_name = "user/login.html"

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PwdHelpView(TemplateView):
    template_name = 'user/password.html'

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
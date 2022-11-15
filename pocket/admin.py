from django.contrib import admin

from pocket.models import User, Email, Site, Highlight, Tag, Payment

admin.site.register(User)
"""
노경민 : User 모델 Admin
"""

admin.site.register(Email)
"""
노경민 : Email 모델 Admin
"""

admin.site.register(Site)
"""
노경민 : Site 모델 Admin
"""

admin.site.register(Highlight)
"""
노경민 : Highlight 모델 Admin
"""

admin.site.register(Tag)
"""
노경민 : Tag 모델 Admin 
"""

admin.site.register(Payment)
"""
노경민 : Payment 모델 Admin
"""


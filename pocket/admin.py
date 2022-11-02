from django.contrib import admin

from pocket.models import User, Email, List, Highlight, Tag, Payment

admin.site.register(User)
"""
노경민 : User 모델을 Admin site에 추가.
"""

admin.site.register(Email)
"""
노경민 : Email 모델을 Admin site에 추가.
"""

admin.site.register(List)
"""
노경민 : List 모델을 Admin site에 추가.
"""

admin.site.register(Highlight)
"""
노경민 : Highlight 모델을 Admin site에 추가.
"""

admin.site.register(Tag)
"""
노경민 : Tag 모델을 Admin site에 추가.
"""

admin.site.register(Payment)
"""
노경민 : Payment 모델을 Admin site에 추가.
"""


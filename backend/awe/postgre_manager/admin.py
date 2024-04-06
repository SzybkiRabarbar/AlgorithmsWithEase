from django.contrib import admin
from users_progress.models import UserProgressStatus
from .models import Group, Article, Problem

# Register your models here.

admin.site.register(UserProgressStatus)
admin.site.register(Group)
admin.site.register(Article)
admin.site.register(Problem)

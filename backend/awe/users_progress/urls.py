from django.urls import path
from .views import PatchUserProgressStatus, GetUserProgressStatus

urlpatterns = [
    path('patch/user-progress-status/',
         PatchUserProgressStatus.as_view(),
         name='Patch User Progress Status'),
    path('get/user-progress-status/',
         GetUserProgressStatus.as_view(),
         name='Get User Progress Status'),
]

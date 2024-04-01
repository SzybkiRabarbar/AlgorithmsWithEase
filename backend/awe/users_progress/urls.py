from django.urls import path
from .views import RetrieveUserAction

urlpatterns = [
    path('retrieve-action/', RetrieveUserAction.as_view(), name='Retrieve User Action'),
]

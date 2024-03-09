from django.urls import path
from .views import \
    GroupsView, ArticlesByGroupView, ProblemsByGroupView

urlpatterns = [
    path('groups/',
         GroupsView.as_view(),
         name='GET groups'),
    path('articles/group/<int:group_id>',
         ArticlesByGroupView.as_view(),
         name='GET articles by group'),
    path('problems/group/<int:group_id>',
         ProblemsByGroupView.as_view(),
         name='GET problems by group'),
]
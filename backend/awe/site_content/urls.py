from django.urls import path
from site_content.views import \
    ArticleByIdView, ProblemByIdView, ProblemsByGroupIdView

urlpatterns = [
    path('article/<str:article_id>',
         ArticleByIdView.as_view(),
         name='GET article content'),
    path('problem/<str:question_id>',
         ProblemByIdView.as_view(),
         name='GET question content'),
    path('problems/group/<int:group_id>',
         ProblemsByGroupIdView.as_view(),
         name='GET problems by group_id')
]
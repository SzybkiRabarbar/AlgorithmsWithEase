"""
URL configuration for awe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from site_content.views import \
    ArticleByIdView, QuestionByIdView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/article/<str:article_id>',
         ArticleByIdView.as_view(),
         name='get article content'),
    path('api/question/<str:question_id>',
        QuestionByIdView.as_view(),
        name='get question content'),
]

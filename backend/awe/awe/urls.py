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
from django.urls import include, path
from site_content.views import add_article_view, add_problem_view, \
    delete_article_view, delete_problem_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add/article', add_article_view, name='Add article'),
    path('add/problem', add_problem_view, name='Add problem'),
    path('del/article/<str:fire_id>', delete_article_view, name='Delete article'),
    path('del/problem/<str:fire_id>', delete_problem_view, name='Delete article'),
    path('api/content/', include('site_content.urls')),
    path('api/', include('postgre_manager.urls'))
]

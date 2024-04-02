from rest_framework.views import APIView 
from rest_framework.response import Response 
from .models import Article, Group, Problem

class GroupsView(APIView):

    def get(self, request):

        # groups = Group.objects.exclude(id=1)
        groups = Group.objects.all()
        articles_ids = Article.objects.values_list('group_id', 'id')
        problems_ids = Problem.objects.values_list('group_id', 'id')

        return Response({
            'groups': groups.values(),
            'articles': articles_ids,
            'problems': problems_ids,
        })


class ArticlesByGroupView(APIView):
    
    def get(self, request, group_id):
        
        articles = Article.objects.filter(group_id=group_id)

        return Response(articles.values())


class ProblemsByGroupView(APIView):
    
    def get(self, request, group_id):
        
        problems = Problem.objects.filter(group_id=group_id)

        return Response(problems.values())
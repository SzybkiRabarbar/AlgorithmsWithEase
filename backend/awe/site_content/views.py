from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView 
from rest_framework.response import Response 
import firebase_admin
from firebase_admin import credentials, firestore
from postgre_manager.models import Article, Problem


class Firebase():
    cred = credentials.Certificate('site_content/creds/cred-firebase-adminsdk.json')
    fireapp = firebase_admin.initialize_app(cred)
    db = firestore.client()


class ArticleByIdView(APIView):

    def get(self, request, article_id=None):
        article = Firebase.db.collection("articles").document(article_id).get()
        return Response(article.to_dict())


class ProblemByIdView(APIView):
    
    def get(self, request, question_id=None):
        problem = Firebase.db.collection("problems").document(question_id).get()
        return Response(problem.to_dict())


@login_required
def add_article_view(request):

    if request.method == "POST":
        article_data = Utils.fetch_article_form(request)
        fire_id = Utils.add_data_to_firestore('articles', article_data)
        article = Article(
            name=request.POST.get('name'),
            fire_id=fire_id,
            group_id=article_data['group_id']
        )
        article.save()

    return render(request, 'add_article.html')


@login_required
def add_problem_view(request):

    if request.method == "POST":
        problem_data = Utils.fetch_problem_form(request)
        fire_id = Utils.add_data_to_firestore('problems', problem_data)
        problem = Problem(
            name=request.POST.get('name'),
            fire_id=fire_id,
            group_id=problem_data['group_id']
        )
        problem.save()

    return render(request, 'add_problem.html')


class Utils:

    @staticmethod
    def fetch_article_form(request) -> dict:
        result = dict()
        form = dict(request.POST.items())

        for key in ['title', 'group_id']:
            result[key] = form[key]

        counter = 0
        while True:
            order = str(counter)
            id_ = order + ':'

            if id_ not in form:
                break

            type = form[id_]
            result[order] = [type, {}]
            content_dict = result[order][1]

            match type:
                case '0':  # text
                    content_dict['text'] = form[id_ + 'text']
                case '1':  # img
                    content_dict['src'] = form[id_ + 'src']
                    content_dict['alt'] = form[id_ + 'alt']
                case '2':  # video
                    content_dict['url'] = form[id_ + 'url']
                case '3':  # code
                    content_dict['url'] = form[id_ + 'url']
                case '4':  # note
                    content_dict['note'] = form[id_ + 'note']
            
            counter += 1
        return result

    @staticmethod
    def add_data_to_firestore(collection: str, data: dict) -> str:
        doc_ref = Firebase.db.collection(collection).document()
        doc_ref.set(data)
        return doc_ref.id

    @staticmethod
    def fetch_problem_form(request) -> dict:
        result = dict()
        form_ = dict(request.POST.items())

        for key in ['problem_url', 'group_id', 'important',
                    'solution_url', 'video_url']:
            if key in form_:
                result[key] = form_[key]
        
        result['tips'] = []

        counter = 0
        while str(counter) in form_:
            result['tips'].append(form_[str(counter)])
            counter += 1
        return result
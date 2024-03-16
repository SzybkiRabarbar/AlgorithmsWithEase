from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from rest_framework.views import APIView 
from rest_framework.response import Response 
from postgre_manager.models import Article, Problem
from site_content.firebase_conn.firebase_conn import firebase_instance


class ArticleByIdView(APIView):

    def get(self, request, article_id=None):
        article = firebase_instance.db.collection("articles").document(article_id).get()
        return Response(article.to_dict())


class ProblemByIdView(APIView):
    
    def get(self, request, question_id=None):
        problem = firebase_instance.db.collection("problems").document(question_id).get()
        return Response(problem.to_dict())


@login_required
def add_article_view(request):

    if request.method == "POST":
        article_data = Utils.fetch_article_form(request)
        fire_id = Utils.add_data_to_firestore('articles', article_data)
        article = Article(
            name=request.POST.get('name'),
            fire_id=fire_id,
            group_id=article_data['group_id'],
            z_index=request.POST.get('z_index'),
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
            group_id=problem_data['group_id'],
        )
        problem.save()

    return render(request, 'add_problem.html')


@login_required
def delete_article_view(request, fire_id):

    try:
        firebase_instance.db.collection('articles').document(fire_id).delete()
        fire_msg = "FireBase: DELETE successful"
    except Exception as err:
        fire_msg = f"FireBase: {err}"

    try:
        article = Article.objects.filter(fire_id=fire_id)
        if article.exists():
            article.delete()
        postgre_msg = "Postgre: DELETE successful"
    except Exception as err:
        postgre_msg = f"Postgre: {err}"

    return HttpResponse(f"{fire_msg}\n{postgre_msg}", content_type="text/plain")


@login_required
def delete_problem_view(request, fire_id):

    try:
        firebase_instance.db.collection('problems').document(fire_id).delete()
        fire_msg = "FireBase: DELETE successful"
    except Exception as err:
        fire_msg = "FireBase: " + err

    try:
        problem = Problem.objects.filter(fire_id=fire_id)
        if problem.exists():
            problem.delete()
        postgre_msg = "Postgre: DELETE successful"
    except Exception as err:
        postgre_msg = "Postgre: " + err

    return HttpResponse(f"{fire_msg}\n{postgre_msg}", content_type="text/plain")


class Utils:

    @staticmethod
    def fetch_article_form(request) -> dict:
        result = dict()
        form = dict(request.POST.items())

        for key in ['title', 'group_id']:
            result[key] = form[key]
        result['content'] = {}

        counter = 0
        while True:
            order = str(counter)
            id_ = order + ':'

            if id_ not in form:
                break

            type = form[id_]
            result['content'][order] = [type, {}]
            content_dict = result['content'][order][1]

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
            
            content_dict['afterspace'] = form[id_ + 'afterspace']
            
            counter += 1
        return result

    @staticmethod
    def add_data_to_firestore(collection: str, data: dict) -> str:
        doc_ref = firebase_instance.db.collection(collection).document()
        doc_ref.set(data)
        return doc_ref.id

    @staticmethod
    def fetch_problem_form(request) -> dict:
        result = dict()
        form_ = dict(request.POST.items())

        for key in ['problem_url', 'group_id', 'important',
                    'solution', 'video_url', 'difficulty']:
            if key in form_:
                result[key] = form_[key]
        
        result['tips'] = []

        counter = 0
        while str(counter) in form_:
            result['tips'].append(form_[str(counter)])
            counter += 1
        return result
from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 
import firebase_admin
from firebase_admin import credentials, firestore


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
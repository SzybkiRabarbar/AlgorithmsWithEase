from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.types import StructuredQuery as StQu


class Firebase():
    cred = credentials.Certificate('site_content/creds/cred-firebase-adminsdk.json')
    fireapp = firebase_admin.initialize_app(cred)
    db = firestore.client()

  
class ArticlesListView(APIView): 

    def get(self, request): 
        articles_ref = Firebase.db.collection("articles")
        
        articles = [art.to_dict() for art in articles_ref.stream()]
            
        return Response(articles) 


class ArticleByIdView(APIView):

    def get(self, request, article_id=None):
        article = Firebase.db.collection("articles").document(article_id).get()
        return Response(article.to_dict())


class ArticleByGroupView(APIView):

    def get(self, request, group_id=None):
        articles_ref = (
            Firebase.db.collection("articles")
            .where(filter=StQu.FieldFilter('group', '==', group_id))
        )

        articles = [art.to_dict() for art in articles_ref.stream()]

        return Response(articles)
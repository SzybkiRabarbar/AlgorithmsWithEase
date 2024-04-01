import json
import jwt
import requests
from rest_framework.response import Response
from rest_framework import status


class ValidateToken:

    with open('users_progress/creds/identity-platform.json', 'r') as file:
        CLIENTID = json.load(file)['clientId']

    @staticmethod
    def decode(token):

        # Get Google's public keys
        keys = requests.get('https://www.googleapis.com/oauth2/v1/certs').json()
        header = jwt.get_unverified_header(token)
        public_key = keys[header['kid']]

        try:
            # Validate the token
            payload = jwt.decode(
                token, 
                public_key, 
                algorithms='RS256', 
                audience=ValidateToken.CLIENTID,
                issuer='https://accounts.google.com'
            )
            return payload
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
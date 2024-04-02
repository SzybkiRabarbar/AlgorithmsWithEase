from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users_progress.validate_token.validate_token import ValidateToken

class RetrieveUserAction(APIView):

    def patch(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        group_id = request.data.get('groupId')
        fire_id = request.data.get('fireId')
        action_number = request.data.get('actionNumber')

        if not all([token, group_id, fire_id, action_number]):
            return Response({'error': 'Missing required parameters'},
                            status=status.HTTP_400_BAD_REQUEST)

        payload = ValidateToken.decode(token.split(' ')[1]
                                       if ' ' in token else None)
        if isinstance(payload, str):  # | If error occurred
            return Response({'error:': payload},
                            status=status.HTTP_401_UNAUTHORIZED)

        print(payload['user_id'])

        return Response({'status': 'success'}, status=status.HTTP_200_OK)

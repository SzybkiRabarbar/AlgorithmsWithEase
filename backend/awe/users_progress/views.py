from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users_progress.validate_token.validate_token import ValidateToken

class RetrieveUserAction(APIView):

    def post(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        group_id = request.data.get('group_id')
        fire_id = request.data.get('fire_id')
        action_number = request.data.get('action_number')

        if not all([token, group_id, fire_id, action_number]):
            return Response({'error': 'Missing required parameters'}, status=status.HTTP_400_BAD_REQUEST)

        payload = ValidateToken.decode(token)
        if isinstance(payload, Response):  # | If error occurred
            return payload

        # If token is valid, continue processing the request
        # Here you can add your logic to process the data

        return Response({'status': 'success'}, status=status.HTTP_200_OK)

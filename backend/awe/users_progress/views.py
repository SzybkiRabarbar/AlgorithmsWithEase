from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users_progress.validate_token.validate_token import ValidateToken
from .models import UserProgressStatus


class PatchUserProgressStatus(APIView):

    def patch(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        group_id = request.data.get('group_id')
        type_ = request.data.get('type_')
        fire_id = request.data.get('fire_id')
        progress_status = request.data.get('progress_status')

        if not all([token, group_id, type_, fire_id,
                    isinstance(progress_status, int)]):
            return Response({'error': 'Missing required parameters'},
                            status=status.HTTP_400_BAD_REQUEST)

        payload = ValidateToken.decode(token)
        if isinstance(payload, str):  # | If error occurred
            return Response({'error:': payload},
                            status=status.HTTP_401_UNAUTHORIZED)

        # | Appending/Changing user progress_status
        try:
            row = UserProgressStatus.objects.get(
                user_id=payload['user_id'],
                group_id=group_id, 
                fire_id=fire_id,
                is_problem=(type_ == 'problems')
            )
            row.progress_status = progress_status
            row.save()

        except UserProgressStatus.DoesNotExist:
            new_row = UserProgressStatus( 
                user_id=payload['user_id'],
                group_id=group_id, 
                fire_id=fire_id,
                is_problem=(type_ == 'problems'),
                progress_status=progress_status 
            )
            new_row.save()

        return Response({'status': 'success'}, status=status.HTTP_200_OK)


class GetUserProgressStatus(APIView):
    
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)

        if not all([token]):
            return Response({'error': 'Missing required parameters'},
                            status=status.HTTP_400_BAD_REQUEST)

        payload = ValidateToken.decode(token)
        if isinstance(payload, str):  # | If error occurred
            print(payload)
            return Response({'error:': payload},
                            status=status.HTTP_401_UNAUTHORIZED)

        model_objects = UserProgressStatus.objects
        user_progress_status = model_objects.filter(user_id=payload['user_id'])

        # { group_id : { type_ : { fire_id : progress_status } } }
        transformed_data = defaultdict(dict)
        for i in user_progress_status:
            type_ = 'problems' if i.is_problem else 'articles'
            transformed_data[i.group_id][type_][i.fire_id] = i.progress_status

        return Response(transformed_data)


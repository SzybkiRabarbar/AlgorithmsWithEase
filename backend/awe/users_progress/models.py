from django.db import models


class UserProgressStatus(models.Model):
    user_id = models.CharField(max_length=255)
    group_id = models.IntegerField()
    fire_id = models.CharField(max_length=255)
    is_problem = models.BooleanField()
    progress_status = models.IntegerField()

    def __str__(self):
        return f"{self.user_id} - {self.fire_id} - {self.progress_status}"
from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Article(models.Model):
    name = models.CharField(max_length=255)
    fire_id = models.CharField(max_length=255)
    group = models.ForeignKey(Group, on_delete=models.SET_DEFAULT, default=1)

    def __str__(self):
        return self.name


class Problem(models.Model):
    name = models.CharField(max_length=255)
    fire_id = models.CharField(max_length=255)
    group = models.ForeignKey(Group, on_delete=models.SET_DEFAULT, default=1)

    def __str__(self):
        return self.name
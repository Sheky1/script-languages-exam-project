from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    category = models.CharField(max_length = 18)
    content = models.TextField(max_length = 500)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content

class Note(models.Model):
    title = models.CharField(max_length = 30)
    content = models.TextField(max_length = 500)
    category = models.CharField(max_length = 18)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content

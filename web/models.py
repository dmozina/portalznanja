__author__ = 'David'

from django.db import models

class User(models.Model):
    GENRE_OPTIONS = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    user_name = models.CharField(max_length=20)
    password = models.CharField(max_length=50)
    email = models.EmailField()
    genre = models.CharField(max_length=2, choices=GENRE_OPTIONS)

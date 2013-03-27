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
    user_password = models.CharField(max_length=150)
    email = models.EmailField()
    genre = models.CharField(max_length=2, choices=GENRE_OPTIONS)

class Video_resource(models.Model):
    RATING_OPTIONS = (
        (1, 'Very bad'),
        (2, 'Bad'),
        (3, 'Good'),
        (4, 'Very good'),
        (5, 'Excellent'),
    )
    title = models.CharField(max_length=150)
    url = models.URLField()
    length = models.IntegerField()
    quality = models.IntegerField()
    genre = models.CharField(max_length=100)
    rating = models.IntegerField(choices=RATING_OPTIONS)

class Comment(models.Model):
    video = models.ForeignKey(Video_resource)
    date_time = models.DateTimeField()
    comment_text = models.TextField()
    user = models.ForeignKey(User)

class Audit(models.Model):
    user = models.ForeignKey(User)
    login_datetime = models.DateTimeField()
    logout_datetime = models.DateTimeField()
    session_time = models.DecimalField(max_digits=20, decimal_places=5)





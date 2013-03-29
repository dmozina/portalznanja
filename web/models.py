__author__ = 'David, Alexander, Busho'

from django.db import models
from django.contrib.auth.models import User

class Custom_user(models.Model):
    user = models.OneToOneField(User)


class User_preferences(models.Model):
    LANGUAGES = ()
    TIMEZONES = ()
    language = models.IntegerField(choices=LANGUAGES)
    timezone = models.IntegerField(choices=TIMEZONES)
    subscribe = models.BooleanField(default=False)
    signature = models.TextField(max_length=100)
    user = models.ForeignKey(Custom_user)


class Video_resource(models.Model):
    RATING_OPTIONS = (
        (1, 'Very bad'),
        (2, 'Bad'),
        (3, 'Good'),
        (4, 'Very good'),
        (5, 'Excellent'),
    )
    QUALITY = (
        #TODO: insert quality choices
    )
    title = models.TextField(max_length=150)
    url = models.URLField()
    length = models.IntegerField()
    quality = models.IntegerField(choices=QUALITY)
    genre = models.TextField(max_length=100)
    rating = models.IntegerField(choices=RATING_OPTIONS)
    owner = models.ForeignKey(Custom_user)


class Comment(models.Model):
    owner = models.ForeignKey(Custom_user)
    date_time = models.DateTimeField()
    comment_text = models.TextField(max_length=1000)
    active = models.BooleanField(default=True)


class Topic(models.Model):
    video = models.ForeignKey(Video_resource)
    comments = models.ManyToManyField(Comment)



class Audit(models.Model):
    user = models.ForeignKey(Custom_user)
    login_datetime = models.DateTimeField()
    logout_datetime = models.DateTimeField()
    session_time = models.DecimalField(max_digits=20, decimal_places=5)





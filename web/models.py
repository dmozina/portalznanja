__author__ = 'David, Alexander, Busho'

from django.db import models
from django.contrib.auth.models import User


class User_preferences(models.Model):
    LANGUAGES = ()
    TIMEZONES = ()
    language = models.IntegerField(choices=LANGUAGES)
    timezone = models.IntegerField(choices=TIMEZONES)
    subscribe = models.BooleanField(default=False)
    signature = models.TextField(max_length=100)
    user = models.ForeignKey(User)


class Audit(models.Model):
    user = models.ForeignKey(User)
    login_datetime = models.DateTimeField()
    logout_datetime = models.DateTimeField()
    session_time = models.DecimalField(max_digits=20, decimal_places=5)


# General Category of the video
class Category(models.Model):
    cat = models.TextField(max_length=50)


# Language of the video
class Language(models.Model):
    language = models.TextField(max_length=50)


#Video model represent one video uploaded and/or found by internal
# parser on the selected sites.
#A video is a lone standing entity and is aways displayed with its
# comments on the /video subpage.
class Video(models.Model):
    title = models.TextField(max_length=150)
    url = models.URLField()  # url to the original stream origin
    length = models.IntegerField()  # in seconds
    upVotes = models.IntegerField(default=0)
    downVotes = models.IntegerField(default=0)  # number of votes
    owner = models.ForeignKey(User)  # owner of the video
    displayImage = models.TextField(max_length=100)  # URI to the video image
    language = models.ForeignKey(Language)
    category = models.ForeignKey(Category)


# FeaturedVideo model represents videos that are currently globally
# featured (ea. they are shown on index page when non logged in user
# visits the featured.html page).
# Currently, this table is managed by admin team (ea. each
# featured video should be manually inserted into the database).
class FeaturedVideo(models.Model):
    vId = models.OneToOneField(Video)


#Comment model represent single entity of feedback posted by user.
# The comment is linked to a video and owner.
class Comment(models.Model):
    STATE = (
        (1, 'Posted'),
        (2, 'Removed'),
        (3, 'Reported')
    )
    owner = models.ForeignKey(User)
    datePosted = models.DateTimeField()
    text = models.TextField(max_length=1000)
    state = models.IntegerField(choices=STATE, default=1)
    upVotes = models.IntegerField(default=0)
    downVotes = models.IntegerField(default=0)  # number of votes
    video = models.ForeignKey(Video)


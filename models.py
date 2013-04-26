 __author__ = 'Alexander'


from django.db import models

class Video_Resource(models.Model):
   EXTRA_HIGH = '1024*768'
   HIGH = '800*600'
   MIDDLE = '640*480'
   LOW = '320*240'
   QUALITIES = (
       (EXTRA_HIGH, 'extra_high'),
       (HIGH, 'high'),
       (MIDDLE, 'middle'),
       (LOW, 'low'),
   )
   GENRES = (
       ('mathematics'),
       ('data_structures'),
       ('algorithms'),
       ('languages'),
   )
   RATINGS = (
       (5,'5'),
       (4,'4'),
       (3,'3'),
       (2,'2'),
       (1,'1')
   )
   tittle = models.CharField(max_length=200)
   url = models.URLField(max_length=200)
   len = models.PositiveIntegerField()
   quality = models.CharField(max_length=32,choices=QUALITIES,default=MIDDLE)
   genre = models.CharField(max_length=64,choices=GENRES)
   rating = models.PositiveIntegerField(choices=RATINGS)

class User_Preferences(models.Model):
   ENG = 'en'
   DEA = 'dea'
   FRB = 'frb'
   LANGUAGES = (
       (ENG, 'english'),
       (DEA, 'deutsch'),
       (FRB, 'francoise')
   )
   CE = '1'
   GR = '0'
   EE = '2'
   TIMEZONES = (
       -1, -2, -3, -4, -5, -6, -7, -8, -9, -10 -11, -12,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
   )
   tag = models.CharField(max_length=64)
   preferred_videos = models.TextField(max_length=2048)
   language = models.CharField(max_length=32, choices=LANGUAGES)
   timezone = models.IntegerField(choices=TIMEZONES)
   preferred_genre = models.CharField(max_length=64, choices=video_resource.GENRES)
   models.ForeignKey('User')

class Comment(models.Model):
   subject = models.CharField(max_length=64)
   text = models.TextField(max_length=4096)
   datetime = models.DateTimeField(auto_now=True, auto_now_add=True)

class Audit(models.Model):
   user_login = models.DateTimeField(auto_now=True, auto_now_add=True)
   user_logout = models.DateTimeField(auto_now=True, auto_now_add=True)
   session_time = models.TimeField()
   models.ForeignKey('User')

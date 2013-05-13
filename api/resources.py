from django.http.request import HttpRequest
from tastypie import fields
from tastypie.resources import ModelResource
from web.models import FeaturedVideo, Video


#This is custom video web service called from featured
# video web service. It returns the following columns from the
#Video table.
    #id -  for page redirection to /video?id=<video_id>
    #title
    #displayImage - for JS to grab image from media folder and display it

class Video4FeaturedResource(ModelResource):
    class Meta:
        queryset = Video.objects.all()
        resource_name = 'video'
        excludes = ['ratingNum', 'ratingSum', 'length', 'url']
        list_allowed_methods = ['get']


#Featured video web service that returns the videos that are
#currently marked as featured.
class FeaturedResource(ModelResource):
    video = fields.ForeignKey(Video4FeaturedResource, 'vId', full=True)

    class Meta:
        queryset = FeaturedVideo.objects.all()
        resource_name = 'featured'
        excludes = ['id']
        list_allowed_methods = ['get']


#Returns the stream URL for the video with requested video id.
class VideoStreamResource(ModelResource):
    class Meta:
        queryset = Video.objects.all()
        resource_name = 'videoStream'
        list_allowed_methods = ['get']
        excludes = ['id']
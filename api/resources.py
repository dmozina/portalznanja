from tastypie import fields
from tastypie.resources import ModelResource
from web.models import FeaturedVideo, Video

#Video provider for featuredVideo requests. We read Video table and only return viable information:
    #id for page redirection to /video?id=<video_id>
    #title
    #displayImage -> for JS to grab image from media folder and display it
class Video4FeaturedResource(ModelResource):
    class Meta:
        queryset = Video.objects.all()
        resource_name = 'video4featured'
        excludes = ['ratingNum', 'ratingSum', 'length', 'url']
        list_allowed_methods = ['get']


#Service for featuredVideo functionality. We return videos found the the featuredVideo table.
class FeaturedResource(ModelResource):
    video = fields.ForeignKey(Video4FeaturedResource, 'vId', full=True)
    class Meta:
        queryset = FeaturedVideo.objects.all()
        resource_name = 'featured'
        excludes = ['id']
        list_allowed_methods = ['get']



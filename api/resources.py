from django.http.request import HttpRequest
from tastypie import fields
from tastypie.resources import ModelResource, ALL_WITH_RELATIONS
from web.models import FeaturedVideo, Video, Comment, Language, Category
from django.contrib.auth.models import User


class LanguageResource(ModelResource):
    class Meta:
        queryset = Language.objects.all()
        resource_name = 'language'
        list_allowed_methods = ['get']


class CategoryResource(ModelResource):
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
        list_allowed_methods = ['get']


#This is custom video web service called from featured
# video web service. It returns the following columns from the
#Video table.
    #id -  for page redirection to /video?id=<video_id>
    #title
    #displayImage - for JS to grab image from media folder and display it
class Video4FeaturedResource(ModelResource):
    language = fields.ForeignKey(LanguageResource, 'language', full=True)
    category = fields.ForeignKey(CategoryResource, 'category', full=True)

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


#Returns Users.
class User4VideoResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        list_allowed_methods = ['get']
        fields = ['first_name', 'last_name']


#Returns the stream URL for the video with requested video id.
class VideoStreamResource(ModelResource):
    owner = fields.ForeignKey(User4VideoResource, 'owner', full=True)

    class Meta:
        queryset = Video.objects.all()
        resource_name = 'videoStream'
        list_allowed_methods = ['get']
        excludes = ['id']


#Returns Comments for chosen user id.
class CommentResource(ModelResource):
    owner = fields.ForeignKey(User4VideoResource, 'owner', full=True)
    video = fields.ForeignKey(Video4FeaturedResource, 'video', full=True)

    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'comments'
        list_allowed_methods = ['get']
        filtering = {
            'video': ALL_WITH_RELATIONS,  # FFUUUUUUUUUUUUUU - retarded
        }




from django.http.request import HttpRequest
from tastypie import fields
from tastypie.resources import ModelResource, ALL_WITH_RELATIONS
from web.models import FeaturedVideo, Video, Comment, Language, Category, Tag
from django.contrib.auth.models import User
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import ApiKeyAuthentication


#Language resource.
class LanguageResource(ModelResource):
    class Meta:
        queryset = Language.objects.all()
        resource_name = 'language'
        list_allowed_methods = ['get']


#Category resource.
class CategoryResource(ModelResource):
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
        list_allowed_methods = ['get']

#Tag resource.
class TagResource(ModelResource):
    class Meta:
        queryset = Tag.objects.all()
        resource_name = 'tags'
        list_allowed_methods = ['get']


#This is custom video web service called from featured
#video web service. It returns the following columns from the
#Video table.
#id -  for page redirection to /video?id=<video_id>
#title
#displayImage - for JS to grab image from media folder and display it
class Video4FeaturedResource(ModelResource):
    language = fields.ForeignKey(LanguageResource, 'language', full=True)
    category = fields.ForeignKey(CategoryResource, 'category', full=True)
    tags = fields.ToManyField(TagResource, attribute = 'video_link', full=True)

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
    tags = fields.ToManyField(TagResource, attribute = 'video_link', full=True)
    #tags = fields.ManytoManyKey(??)(tag ws, 'video_link', full=True)

    class Meta:
        queryset = Video.objects.all()
        resource_name = 'videoStream'
        list_allowed_methods = ['get']


#Returns Comments for chosen user id.
class CommentResource(ModelResource):
    owner = fields.ForeignKey(User4VideoResource, 'owner', full=True)
    video = fields.ForeignKey(Video4FeaturedResource, 'video', full=True)

    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'comments'
        list_allowed_methods = ['get', 'post']
        filtering = {
            'video': ALL_WITH_RELATIONS,
        }


#Custom authentication.
class MyAuthentication(ApiKeyAuthentication):
    def is_authenticated(self, request, **kwargs):
        if request.method == 'GET' and request.user.is_authenticated():
            return True
        return super(MyAuthentication, self).is_authenticated(request, **kwargs)


#Custom authorization.
class MyAuthorization( DjangoAuthorization ):
    def is_authorized(self, request, object=None):
        if request.method == 'GET' and request.user.is_authenticated():
            return True
        else:
            return super(MyAuthorization, self).is_authorized(request, object)


class UserVideosResource(ModelResource):
    class Meta:
        queryset = Video.objects.all()
        resource_name = 'userVideos'
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']
        authentication = MyAuthentication()
        authorization = MyAuthorization()
        excludes = ['ratingNum', 'ratingSum', 'length', 'url']

    def apply_authorization_limits(self, request, object_list):
        return object_list.filter(owner=request.user)


class UserCommentsResource(ModelResource):
    video = fields.ForeignKey(Video4FeaturedResource, 'video', full=True)

    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'userComments'
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']
        authentication = MyAuthentication()
        authorization = MyAuthorization()

    def apply_authorization_limits(self, request, object_list):
        return object_list.filter(owner=request.user)



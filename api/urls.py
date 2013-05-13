from django.conf.urls import patterns, include, url

from tastypie.api import Api
from resources import Video4FeaturedResource, FeaturedResource, VideoStreamResource

#Default API for PortalZnanja
v1_api = Api(api_name='v1')
v1_api.register(Video4FeaturedResource())
v1_api.register(FeaturedResource())
v1_api.register(VideoStreamResource())


urlpatterns = patterns(
    '',
    url(r'^api/', include(v1_api.urls)),
)

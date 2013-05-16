from django.conf.urls import *

# Uncomment the next line to enable the admin:
from django.contrib import admin

#Portalznanja views:
from web import views as views

admin.autodiscover()

urlpatterns = patterns(
    '',
    #Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    #Portal znanja home page:
    url(r'^$', views.HomeView, name='home'),

    #Search subpage.
    url(r'^search$', views.SearchView, name='search'),

    #User management:
    url(r'^login/$', views.LoginView, name='login'),
    url(r'^logout/$', views.LogoutView, name='logout'),
    url(r'^user/$', views.UserView),

    #Include API URLs
    url(r'^', include('api.urls')),

    #Video url
    url(r'^video/$', views.VideoView, name='video'),

    #animation
    #TODO: change the animation url
    url(r'^animation/$', views.AnimationView, name='animation')
)

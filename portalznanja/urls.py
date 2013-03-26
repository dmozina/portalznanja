from django.conf.urls import *

# Uncomment the next line to enable the admin:
from django.contrib import admin

#Portalznanja views:
from web import views as views


admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'portalznanja.views.home', name='home'),
    # url(r'^portalznanja/', include('portalznanja.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    #Portal znanja home page:
    url(r'^$', views.HomeView.as_view(), name='home'),

    #Search
    url(r'^$', views.SearchView.as_view()),

    #User management:
    url(r'^login/$', views.LoginView),
    url(r'^user/$', views.UserView.as_view()),
    url(r'^logout/$', views.LogoutView),
)

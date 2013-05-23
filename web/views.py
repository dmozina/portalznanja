__author__ = 'busho'

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import redirect

from django.contrib.auth.models import User
from models import Video, Comment, Language, Category, Tag
from datetime import datetime
from portalznanja import settings


def handle_uploadVideo(file):
    if file:
        destination = open(settings.MEDIA_ROOT + "/" + file.name, 'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()


def handle_uploadVideoImage(file):
    if file:
        destination = open(settings.STATIC_ROOT + "/images/" + file.name, 'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()


# User login view. On HTTP GET request we provide
# login.html page and on HTTP POST request we authenticate and
# authorize user wishing to login. This is done via
# the inherited authenticate() and login() methods provided
# by the authentication middleware components.
def LoginView(request):
    if request.method == 'GET' or request.user.is_authenticated():
        return render_to_response('login.html', None,
                                  context_instance=RequestContext(request))
    else:
        if request.POST['un'] is not None and request.POST['pw'] is not None:
            user = authenticate(username=request.POST['un'],
                                password=request.POST['pw'])
            if user is not None and user.is_active:
                login(request, user)
                return redirect('/#/')
            else:
                return render_to_response('login.html', None,
                                          context_instance=RequestContext(
                                              request))


# User logout view. Inherited logout() method is called which logs
# out the user and does not throw exception if no sessions is available.
#  After logout() method is called we redirect the user to the home.html page.
def LogoutView(request):
    logout(request)
    return redirect('/#/')


# Home view. Provides home.html page.
def HomeView(request):
    return render_to_response('home.html', None,
                              context_instance=RequestContext(request))


# Search view. Provides search.html page for both authenticated and
# anonymous users.
def SearchView(request):
    return render_to_response('search.html', None,
                              context_instance=RequestContext(request))


# User view. Authenticated users can modify their preferences
# via this interface.
def UserView(request):
    if request.user.is_authenticated():
        return render_to_response('user.html', None,
                                  context_instance=RequestContext(request))
    else:
        return render_to_response('login.html', None,
                                  context_instance=RequestContext(request))


# User upload view.
def UserUploadView(request):
    if request.user.is_authenticated():
        if request.method == "GET":
            return render_to_response('userUpload.html', None,
                                      context_instance=RequestContext(request))
        elif request.method == "POST":
            videoName = request.POST['videoName']
            vUrl = None
            if request.POST['ch'] == "own":
                handle_uploadVideo(request.FILES['videoFile'])
                vUrl = request.FILES['videoFile'].name
            elif request.POST['ch'] == "stream":
                vUrl = request.POST['videoStream']
            vLanguage = request.POST['language']
            vCategory = request.POST['category']
            pic = None
            if 'pic' not in request.FILES:
                pic = "testVideo1-12442143145e53.jpg"
            else:
                handle_uploadVideoImage(request.FILES['pic'])
                pic = request.FILES['pic'].name

            lan = Language.objects.get(pk=int(vLanguage))
            cat = Category.objects.get(pk=int(vCategory))

            video = Video(title=videoName, url="http://127.0.0.1:8000/media/" + vUrl, length=500, owner=request.user, displayImage=pic,
                          language=lan, category=cat)
            video.save()

            tags = request.POST['tags'].split(",")
            for tag in tags:
                tg, created = Tag.objects.get_or_create(tag_name=tag)
                video.video_link.add(tg)
            video.save()
            return redirect("/video/?vId=" + str(video.id))
    else:
        return render_to_response('login.html', None,
                                  context_instance=RequestContext(request))


# User Videos view.
def UserVideosView(request):
    if request.user.is_authenticated():
        return render_to_response('userVideos.html', None,
                                  context_instance=RequestContext(request))
    else:
        return render_to_response('login.html', None,
                                  context_instance=RequestContext(request))


# User Comments view.
def UserCommentsView(request):
    if request.user.is_authenticated():
        return render_to_response('userComments.html', None,
                                  context_instance=RequestContext(request))
    else:
        return render_to_response('login.html', None,
                                  context_instance=RequestContext(request))


# User view. Authenticated users can modify their preferences
# via this interface.
def VideoView(request):
    return render_to_response('video.html', None,
                              context_instance=RequestContext(request))


#Currently separated animation. TODO: remove this and integrate in base.html.
def AnimationView(request):
    return render_to_response('rapha1.htm', None,
                              context_instance=RequestContext(request))


#Adds the comment to the video.
def AddCommentView(request):
    if request.is_ajax() and request.user.is_authenticated() and request.method == "POST":
        try:
            user = User.objects.filter(id=request.user.id)
            v = Video.objects.get(pk=int(request.POST['videoId']))
            comment = Comment(owner=request.user, datePosted=datetime.now(), text=request.POST['text'], video=v)
            comment.save()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)


#This view is called for up voting, down voting or reporting a comment.
def ManiCommentView(request):
    if not request.user.is_authenticated():
        return HttpResponse(status=403)
    if request.is_ajax() and request.method == "POST":
        try:
            comment = Comment.objects.get(pk=int(request.POST['commentId']))
            if request.POST['action'] == "up":
                comment.upVotes += 1
                comment.save()
            elif request.POST['action'] == "down":
                comment.downVotes += 1
                comment.save()
            elif request.POST['action'] == "remove":
                Comment.objects.filter(pk=int(request.POST['commentId'])).delete()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)


#This view is called for up voting, down voting or reporting a video.
def ManiVideoView(request):
    if not request.user.is_authenticated():
        return HttpResponse(status=403)
    if request.is_ajax() and request.method == "POST":
        try:
            video = Video.objects.get(pk=int(request.POST['videoId']))
            if request.POST['action'] == "up":
                video.upVotes += 1
                video.save()
            elif request.POST['action'] == "down":
                video.downVotes += 1
                video.save()
            elif request.POST['action'] == "remove":
                Video.objects.filter(pk=int(request.POST['videoId'])).delete()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=400)



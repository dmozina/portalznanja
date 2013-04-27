__author__ = 'busho'

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout


#This method provides user's first_name if user is authenticated or None otherwise. This is used for#
#welcome,<user_firstName>! label on the pages.#
#This method should be called from RequestContext constructor where deemed necessary.#
#@param: RequestContext - user context#
#@return: user.first_name if authenticated or None otherwise.#
def getUserName(request):
    if request.user.is_authenticated():
        return request.user.first_name
    else:
        return None


# User login view. On HTTP GET request we provide login.html page and on HTTP POST request we authenticate and
# authorize user wishing to login. This is done via the inherited authenticate() and login() methods provided
# by the authentication middleware components.
def LoginView(request):
    if request.method == 'GET' or request.user.is_authenticated():
        return render_to_response('login.html', None, context_instance=RequestContext(request))
    else:
        if request.POST['un'] != None and request.POST['pw'] != None:
            user = authenticate(username = request.POST['un'], password = request.POST['pw'])
            if user is not None and user.is_active:
                login(request, user)
                return render_to_response('home.html', None, context_instance=RequestContext(request,
                    {'user_firstName': getUserName(request),}))
            else:
                return render_to_response('login.html', None, context_instance=RequestContext(request,
                    {'result': 'Login unsuccessful!',}))


# User logout view. Inherited logout() method is called which logs out the user and does not throw exception if
# no sessions is available. After logout() method is called we redirect the user to the home.html page.
def LogoutView(request):
    logout(request)
    return render_to_response('home.html', None, context_instance=RequestContext(request,
        {'user_firstName': getUserName(request),}))


# Home view. Provides home.html page.
def HomeView(request):
    return render_to_response('home.html', None, context_instance=RequestContext(request,
        {'user_firstName': getUserName(request),}))

# Search view. Provides search.html page for both authenticated and anonymous users.
def SearchView(request):
    return render_to_response('search.html', None, context_instance=RequestContext(request,
        {'user_firstName': getUserName(request),}))


# User view. Authenticated users can modify their preferences via this interface.
def UserView(request):
    if request.user.is_authenticated():
        return render_to_response('user.html', None, context_instance=RequestContext(request))
    else:
        return render_to_response('login.html', None, context_instance=RequestContext(request,
            {'user_firstName': getUserName(request),}))


# User view. Authenticated users can modify their preferences via this interface.
def VideoView(request):
    return render_to_response('video.html', None, context_instance=RequestContext(request,
            {'user_firstName': getUserName(request),}))


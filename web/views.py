__author__ = 'busho'

from django.views.generic import TemplateView
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout

# User login view. On HTTP GET request we provide login.html page and on HTTP POST request we authenticate and
# authorize user wishing to login. This is done via the inherited authenticate() and login() methods provided
# by the authentication middleware components.
# TODO: Implement 'login unsuccessful' notice on failed login attempt.
def LoginView(request):
    if request.method == 'GET':
        return render_to_response('login.html', None, context_instance=RequestContext(request))
    else:
        if request.POST['un'] != None and request.POST['pw'] != None:
            user = authenticate(username = request.POST['un'], password = request.POST['pw'])
            if user is not None and user.is_active:
                login(request, user)
                return render_to_response('home.html', None, context_instance=RequestContext(request))
            else:
                return render_to_response('login.html', None, context_instance=RequestContext(request))


# User logout view. Inherited logout() method is called which logs out the user and does not throw exception if
# no sessions is available. After logout() method is called we redirect the user to the home.html page.
def LogoutView(request):
    logout(request)
    return render_to_response('home.html', None, context_instance=RequestContext(request))


# Home view. Provides home.html page.
# TODO: Implement 'welcome, <user_name>' label for authenticated users.
def HomeView(request):
    return render_to_response('home.html', None, context_instance=RequestContext(request))

# Search view. Provides search.html page for both authenticated and anonymous users.
def SearchView(request):
    return render_to_response('search.html', None, context_instance=RequestContext(request))


# User view. Authenticated users can modify their preferences via this interface.
def UserView(request):
    if request.user.is_authenticated():
        return render_to_response('user.html', None, context_instance=RequestContext(request))
    else:
        return render_to_response('login.html', None, context_instance=RequestContext(request))


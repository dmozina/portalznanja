__author__ = 'busho'

from django.views.generic import TemplateView
from django.shortcuts import render_to_response
from django.template import RequestContext

# User login view.
def LoginView(request):
    if request.method == 'GET':
        return render_to_response('login.html', None, context_instance=RequestContext(request))
    else:
        if request.POST['un'] != None and request.POST['pw'] != None:
            username = request.POST['un']
            password = request.POST['pw']
            print username + " " + password
            render_to_response('user.html', None, context_instance=RequestContext(request))


# User login view.
def LogoutView(request):
    if request.method == 'POST':
        #do_logout
        return render_to_response('login.html')


# '/' path view.
class HomeView(TemplateView):
    template_name = 'home.html'

# Search view.
class SearchView(TemplateView):
    template_name = 'search.html'

# User view.
class UserView(TemplateView):
    template_name = 'user.html'


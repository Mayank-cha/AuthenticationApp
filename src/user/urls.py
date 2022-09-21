from django.urls import path

from user.views import UserViews

urlpatterns = [
    path('/signup', UserViews.signup, name='signup'),
    path('/login', UserViews.login, name='login'),
]

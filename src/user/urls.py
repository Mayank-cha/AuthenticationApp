from django.urls import path

from user.views import UserViews

urlpatterns = [
    path('/<int:user_id>', UserViews.get_user, name='get-user'),
    path('/<int:user_id>/update', UserViews.update_user, name='update-user'),
    path('/<int:user_id>/update-profile-image', UserViews.update_profile_image, name='update-profile-image'),
    path('/signup', UserViews.signup, name='signup'),
    path('/login', UserViews.login, name='login'),
]

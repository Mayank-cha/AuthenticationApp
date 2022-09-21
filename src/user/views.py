from rest_framework.decorators import api_view

# Create your views here.
from helpers.constants import Response
from helpers.helper import hash_password
from helpers.responses import data_not_acceptable, response_success
from user.models import User


class UserViews:
    @api_view(['POST'])
    def signup(request, **kwargs):
        name = request.POST.get('name')
        bio = request.POST.get('bio')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        password = request.POST.get('password')

        user_object = User.search_user(email=email, phone=phone)

        if user_object:
            return data_not_acceptable(Response.ALREADY_EXIST.value.format("User with given phone or email"))

        user_object = User(
            name=name,
            bio=bio,
            phone=phone,
            email=email
        )
        user_object.password = hash_password(plain_text=password)
        user_object.save()

        return response_success(Response.ADD_SUCCESS.value.format("User"), {})

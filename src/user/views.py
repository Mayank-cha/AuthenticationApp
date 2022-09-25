from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from helpers.constants import Response
from helpers.helper import hash_password, verify_password
from helpers.responses import data_not_acceptable, response_success, custom_response
from user.models import User


class UserViews:
    @api_view(['POST'])
    def signup(request, **kwargs):
        name = request.POST.get('name')
        bio = request.POST.get('bio')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        password = request.POST.get('password')
        google_user_id = request.POST.get('google_user_id')

        user_object = User.search_user(email=email, google_user_id=google_user_id)

        if user_object:
            return data_not_acceptable(Response.ALREADY_EXIST.value.format("User with given credentials"))

        try:
            user_object = User(
                name=name,
                bio=bio,
                phone=phone,
                email=email,
                google_user_id=google_user_id
            )
            if password:
                user_object.password = hash_password(plain_text=password)
            user_object.save()
        except Exception as e:
            return custom_response(status.HTTP_200_OK, False, message=Response.INVALID_INFORMATION.value, data={})

        return response_success(Response.ADD_SUCCESS.value.format("User"), {})

    @api_view(['POST'])
    def login(request, **kwargs):
        email = request.POST.get('email')
        password = request.POST.get('password')
        google_user_id = request.POST.get('google_user_id')

        user_object = User.search_user(email=email, google_user_id=google_user_id)

        if user_object and google_user_id:
            return response_success(Response.LOGIN_SUCCESS.value, {})

        if user_object and password:
            if verify_password(plain_text=password, hashed_password=user_object.password):
                return response_success(Response.LOGIN_SUCCESS.value, {})
            else:
                return data_not_acceptable(Response.INCORRECT_PASSWORD.value)

        return data_not_acceptable(Response.NOT_EXIST.value.format("User"))

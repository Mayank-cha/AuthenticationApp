from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from helpers.constants import Response, DEFAULT_USER_PROFILE_IMAGE
from helpers.helper import hash_password, verify_password
from helpers.responses import data_not_acceptable, response_success, custom_response
from user.models import User


class UserViews:
    @api_view(['POST'])
    def signup(request, **kwargs):
        name = request.data.get('name')
        bio = request.data.get('bio')
        phone = request.data.get('phone')
        email = request.data.get('email')
        image_url = request.data.get('image_url')
        password = request.data.get('password')
        google_user_id = request.data.get('google_user_id')

        if not image_url:
            image_url = DEFAULT_USER_PROFILE_IMAGE

        user_object = User.search_user(email=email, google_user_id=google_user_id)

        if user_object and google_user_id:
            user_object = user_object.__dict__

            del user_object['_state']
            del user_object['password']
            del user_object['google_user_id']
            del user_object['is_verified']
            return custom_response(status.HTTP_200_OK, True,
                                   message=Response.ALREADY_EXIST.value.format("User with given credentials"),
                                   data=user_object)

        if user_object:
            return data_not_acceptable(Response.ALREADY_EXIST.value.format("User with given credentials"))

        try:
            user_object = User(
                name=name,
                bio=bio,
                phone=phone,
                email=email,
                image_url=image_url,
                google_user_id=google_user_id
            )
            if password:
                user_object.password = hash_password(plain_text=password)

            user_object.save()

            user_object = user_object.__dict__
            del user_object['_state']
            del user_object['password']
            del user_object['google_user_id']
            del user_object['is_verified']
        except Exception as e:
            print(e)
            return custom_response(status.HTTP_200_OK, False, message=Response.INVALID_INFORMATION.value, data=user_object)

        if not user_object:
            user_object = {}
        return response_success(Response.ADD_SUCCESS.value.format("User"), user_object)

    # login method
    @api_view(['POST'])
    def login(request, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        google_user_id = request.data.get('google_user_id')

        user_object = User.search_user(email=email, google_user_id=google_user_id)

        if user_object and google_user_id:
            user_object = user_object.__dict__
            del user_object['_state']
            del user_object['password']
            del user_object['google_user_id']
            del user_object['is_verified']
            return response_success(Response.LOGIN_SUCCESS.value, user_object)

        if user_object and password:
            if verify_password(plain_text=password, hashed_password=user_object.password):
                user_object = user_object.__dict__
                del user_object['_state']
                del user_object['password']
                del user_object['google_user_id']
                del user_object['is_verified']
                return response_success(Response.LOGIN_SUCCESS.value, user_object)
            else:
                return data_not_acceptable(Response.INCORRECT_PASSWORD.value)

        return data_not_acceptable(Response.NOT_EXIST.value.format("User"))

    @api_view(['GET'])
    def get_user(request, user_id):
        user_object = User.get_by_id(id=user_id)
        if user_object:
            user_object = user_object.__dict__
            del user_object['_state']
            del user_object['password']
            del user_object['google_user_id']
            del user_object['is_verified']
            return response_success(Response.SUCCESS.value, data=user_object)
        else:
            data_not_acceptable(Response.NOT_EXIST.value.format("User"))

    @api_view(['POST'])
    def update_user(request, user_id):
        user_object = User.get_by_id(id=user_id)
        if user_object:
            name = request.data.get('name') if request.data.get('name') else None
            bio = request.data.get('bio') if request.data.get('bio') else None
            phone = request.data.get('phone') if request.data.get('phone') else None
            email = request.data.get('email') if request.data.get('email') else None

            user_object.name = name if name else user_object.name
            user_object.bio = bio if bio else user_object.bio
            user_object.phone = phone if phone else user_object.phone
            user_object.email = email if email else user_object.email
            user_object.save()
            user_object = user_object.__dict__
            del user_object['_state']
            del user_object['password']
            del user_object['google_user_id']
            del user_object['is_verified']
            return response_success(Response.SUCCESS.value, data=user_object)
        else:
            data_not_acceptable(Response.NOT_EXIST.value.format("User"))

    @api_view(['POST'])
    def update_profile_image(request, user_id):
        user_object = User.get_by_id(id=user_id)
        if user_object:
            image_url = request.data.get('image_url')

            if not image_url:
                return data_not_acceptable("Please provide an image url.")

            user_object.image_url = image_url
            user_object.save()
            user_object = user_object.__dict__
            del user_object['_state']
            del user_object['password']
            del user_object['google_user_id']
            del user_object['is_verified']
            return response_success(Response.IMAGE_UPDATE_SUCCESS.value, data=user_object)
        else:
            data_not_acceptable(Response.NOT_EXIST.value.format("User"))



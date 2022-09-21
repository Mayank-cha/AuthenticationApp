from django.db import models
from django.db.models import Q


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=13, unique=True, null=True)
    email = models.EmailField(unique=True, null=False)
    password = models.TextField(null=False)
    is_verified = models.BooleanField(null=True, default=False)

    @classmethod
    def search_user(cls, **kwargs):
        phone = kwargs.get('phone')
        email = kwargs.get('email')

        user_query = User.objects

        if phone and email:
            return user_query.filter(Q(phone=phone) | Q(email=email)).first()

        if phone:
            return user_query.filter(phone=phone).first()

        if email:
            return user_query.filter(email=email).first()
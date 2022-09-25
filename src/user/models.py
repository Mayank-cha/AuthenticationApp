from django.db import models


# Create your models here.
class User(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=13, null=True)
    email = models.EmailField(unique=True, null=False)
    password = models.TextField(null=True) # password null for google auth login
    is_verified = models.BooleanField(null=True, default=False)
    google_user_id = models.CharField(max_length=100, null=True)

    @classmethod
    def search_user(cls, **kwargs):
        email = kwargs.get('email')
        google_user_id = kwargs.get('google_user_id')

        user_query = User.objects

        if google_user_id:
            return user_query.filter(google_user_id=google_user_id).first()

        if email:
            return user_query.filter(email=email).first()

    @classmethod
    def get_by_id(cls, id):
        return User.objects.filter(id=id).first()
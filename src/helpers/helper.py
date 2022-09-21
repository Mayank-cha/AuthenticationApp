import time

from passlib.hash import pbkdf2_sha512
from slugify import slugify


def timestamp():
    return int(time.time())


def hash_password(plain_text):
    return pbkdf2_sha512.hash(plain_text)


def verify_password(plain_text, hashed_password):
    return pbkdf2_sha512.verify(plain_text, hashed_password)


def generate_slug(text):
    return slugify(text)

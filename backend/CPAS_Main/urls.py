from django.urls import path
from .views import test, create_user, logout_user

urlpatterns = [
    path("test/", test),
    path("register/", create_user),
    path("logout/", logout_user),
]

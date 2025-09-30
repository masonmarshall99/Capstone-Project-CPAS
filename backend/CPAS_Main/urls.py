from django.urls import path
from .views import create_user, logout_user, whoami, get_csrf_token

urlpatterns = [
    path("register/", create_user),
    path("logout/", logout_user),
    path("whoami/", whoami),
    path("get-csrf-token/", get_csrf_token),
]

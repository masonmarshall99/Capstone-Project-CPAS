from django.urls import path
from .views import create_user, login_user, logout_user, whoami
from .views import create_user, logout_user, whoami, get_csrf_token

urlpatterns = [
    #path("test/", test),
    path("register/", create_user),
    path("login/", login_user),
    path("logout/", logout_user),
    path("whoami/", whoami),
    path("get-csrf-token/", get_csrf_token),
]

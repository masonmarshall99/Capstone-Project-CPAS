from django.urls import path
from .views import create_user, login_user, logout_user, whoami

urlpatterns = [
    #path("test/", test),
    path("register/", create_user),
    path("login/", login_user),
    path("logout/", logout_user),
    path("whoami/", whoami),
]

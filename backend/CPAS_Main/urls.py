from django.urls import path
from .views import test, create_user, whoami

urlpatterns = [
    path("test/", test),
    path("register/", create_user),
    path("whoami/", whoami)
]

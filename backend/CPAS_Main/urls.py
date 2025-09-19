from django.urls import path
from .views import test, create_user

urlpatterns = [
    path("test/", test),
    path("register/", create_user)
    
]

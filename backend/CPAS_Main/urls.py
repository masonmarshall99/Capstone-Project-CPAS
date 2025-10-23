from django.urls import path
from .views import (create_user, logout_user, whoami, get_csrf_token, edit_user, login_user,
                   download_crop_report_pdf, download_crop_health_data)

urlpatterns = [
    #path("test/", test),
    path("register/", create_user),
    path("login/", login_user),
    path("logout/", logout_user),
    path("whoami/", whoami),
    path("get-csrf-token/", get_csrf_token),
    path("edit-user/", edit_user),
    path("pdf/crop-report/<str:crop_id>/", download_crop_report_pdf, name="download_crop_report_pdf"),
    path("download/crop-health-data/", download_crop_health_data, name="download_crop_health_data"),
]

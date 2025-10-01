from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register([Zone, Location, Season, Crop, CropArea, ProducedIn, Disease, DiseasePresence])

admin.site.register(CPAS_User)
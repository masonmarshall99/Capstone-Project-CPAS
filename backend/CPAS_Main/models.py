from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
import logging

logger = logging.getLogger('cpas')


# Create your models here.

class Zone(models.Model):
    zone_name = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.zone_name

class Region(models.Model):
    region_name = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.region_name

class Location(models.Model):
    sub_region = models.CharField(max_length=255, primary_key=True)
    region = models.ForeignKey(Region, on_delete=models.PROTECT)
    zone = models.ForeignKey(Zone, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.sub_region} (Region: {self.region}, Zone: {self.zone})"

class Season(models.Model):
    year = models.CharField(max_length=7, primary_key=True)

    def __str__(self):
        return self.year

class Crop(models.Model):
    crop_name = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.crop_name

class CropArea(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.PROTECT)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    season = models.ForeignKey(Season, on_delete=models.PROTECT)
    area_hectares = models.FloatField()
    value_tonnes = models.FloatField()

    class Meta:
        unique_together = ('crop', 'location', 'season')

    def __str__(self):
        return f"{self.crop} in {self.location} ({self.season})"

class ProducedIn(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.PROTECT)
    season = models.ForeignKey(Season, on_delete=models.PROTECT)
    average_commodity_price = models.FloatField()

    class Meta:
        unique_together = ('crop', 'season')

    def __str__(self):
        return f"{self.crop} in {self.season}: ${self.average_commodity_price}"

class Disease(models.Model):
    disease_name = models.CharField(max_length=255, primary_key=True)
    disease_group = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.disease_name

class DiseasePresence(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.PROTECT)
    crop = models.ForeignKey(Crop, on_delete=models.PROTECT)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    disease_presence_status = models.CharField(max_length=2)
    disease_incidence_year_percentage = models.FloatField()
    disease_incidence_area_percentage = models.FloatField()
    disease_severity_without_control_percentage = models.FloatField(null=True)
    disease_severity_with_control_percentage = models.FloatField(null=True)
    disease_severity_control_genetic_contribution_percentage = models.FloatField(null=True)
    disease_severity_control_cultural_contribution_percentage = models.FloatField(null=True)
    disease_severity_control_pesticide_contribution_percentage = models.FloatField(null=True)
    fungicide_resistance_risk = models.CharField(max_length=3)

    class Meta:
        unique_together = ('disease', 'crop', 'location')

    def __str__(self):
        return f"{self.disease} on {self.crop} in {self.location}"


# Custom user manager to use email instead of username
# Required to easily handle user and superuser creation as default methods expect a username input

class UserManager(BaseUserManager) :
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Must submit email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self.db)

        extra_fields.setdefault('is_staff', False)
        
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

# Custom user class for authentication and creation

class CPAS_User(AbstractUser):

    username = None

    email = models.EmailField(unique=True)
    # user_role to be added once access control system is implemented

    USERNAME_FIELD = 'email' # set the model to use and emial address in place of a username
    REQUIRED_FIELDS = [] # can be used to set other required fields

    objects = UserManager()

    def __str__(self):
        return self.email
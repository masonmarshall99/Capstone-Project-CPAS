from django.db import models

# Create your models here.

class Zone(models.Model):
    zone_name = models.CharField(max_length=255, primary_key = True)

class Location(models.Model):
    sub_region = models.CharField(max_length=255, primary_key = True)
    region = models.CharField(max_length=255)

class Season(models.Model):
    year = models.PositiveIntegerField(primary_key = True)

class Crops(models.Model):
    crop_name = models.CharField(max_length=255, primary_key = True)

class CropArea(models.Model):
    year = models.PositiveIntegerField(primary_key = True)
    area_hectares = models.FloatField()
    value_tonnes = models.FloatField()
    # Fill in after confirmation regarding primary/foreign key
from .models import *

# Query

def list_zones(*_):
    return Zone.objects.all()

def get_zone(_,zone_name: str):
    return Zone.objects.get(zone_name=zone_name)

def list_locations(*_):
    return Location.objects.all()

def list_seasons(*_):
    return Season.objects.all()

def list_crops(*_):
    return Crops.objects.all()

def list_crop_areas(*_):
    return CropArea.objects.all()

def list_produced_in(*_):
    return ProducedIn.objects.all()

def list_diseases(*_):
    return Disease.objects.all()

def list_disease_presence(*_):
    return DiseasePresence.objects.all()

def list_users(*_):
    return CPAS_User.objects.all()

# Mutation

def create_zone(*_, zone_name: str):
    zone, created = Zone.objects.get_or_create(
        zone_name=zone_name
        )
    
    return {
        "zone_name": zone.zone_name
        }

def create_location(*_, sub_region: str, region: str, zone_name: str):
    zone, created = Zone.objects.get_or_create(
        zone_name=zone_name
        )

    location, created = Location.objects.get_or_create(
        sub_region=sub_region,
        region=region,
        zone=zone
        )
    
    return {
        "sub_region": location.sub_region,
        "region": location.region,
        "zone": {
            "zone_name": zone_name
            }
        }

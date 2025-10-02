from .models import *

# Query

def list_zones(*_):
    return Zone.objects.all()

def get_zone(_,zone_name: str):
    return Zone.objects.get(zone_name=zone_name)

def list_regions(*_):
    return Region.objects.all()

def list_locations(*_):
    return Location.objects.all()

def list_seasons(*_):
    return Season.objects.all()

def list_crops(*_):
    return Crop.objects.all()

def list_crop_areas(*_):
    return CropArea.objects.all()

def list_produced_in(*_):
    return ProducedIn.objects.all()

def list_diseases(*_):
    return Disease.objects.all()

def list_disease_presence(*_):
    return DiseasePresence.objects.all()

# Mutation

def create_zone(*_, zone_name: str):
    zone, created = Zone.objects.get_or_create(
        zone_name=zone_name
    )
    
    return {
        "zone_name": zone.zone_name
    }

def create_region(*_, region_name: str):
    region, created = Region.objects.get_or_create(
        region_name=region_name
    )
    
    return {
        "region_name": region.region_name
    }

def create_location(
    *_, 
    sub_region: str, 
    region_name: str, 
    zone_name: str
):
    
    zone, created = Zone.objects.get_or_create(
        zone_name=zone_name
    )

    region, created = Region.objects.get_or_create(
        region_name=region_name
    )

    location, created = Location.objects.get_or_create(
        sub_region=sub_region,
        region=region,
        zone=zone
    )
    
    return {
        "sub_region": location.sub_region,
        "region": {
            "region_name": region.region_name,
        },
        "zone": {
            "zone_name": zone.zone_name,
        },
    }

def create_season(*_, year: str):
    season, created = Season.objects.get_or_create(
        year=year
    )
    
    return {
        "year": season.year
    }

def create_crop(*_, crop_name: str):
    crop, created = Crop.objects.get_or_create(
        crop_name=crop_name
    )
    
    return {
        "crop_name": crop.crop_name
    }

def create_crop_area(
    *_, 
    crop_name: str, 
    sub_region: str, 
    region_name: str, 
    zone_name: str,
    year: str,
    area_hectares: float,
    value_tonnes: float
):

    crop, created = Crop.objects.get_or_create(
        crop_name=crop_name
    )
    
    zone, created = Zone.objects.get_or_create(
        zone_name=zone_name
    )
    
    region, created = Region.objects.get_or_create(
        region_name=region_name
    )

    location, created = Location.objects.get_or_create(
        sub_region=sub_region,
        region=region,
        zone=zone
    )
    
    season, created = Season.objects.get_or_create(
        year=year
    )
    
    crop_area, created = CropArea.objects.get_or_create(
        crop=crop,
        location=location,
        season=season,
        area_hectares=area_hectares,
        value_tonnes=value_tonnes
    )

    return {
        "crop":{
            "crop_name": crop.crop_name,
        },
        "location": {
            "sub_region": location.sub_region,
            "region": {
                "region_name": region.region_name,
            },
            "zone": {
                "zone_name": zone.zone_name,
            },
        },
        "season": {
            "year": season.year,
        },
        "area_hectares": crop_area.area_hectares,
        "value_tonnes": crop_area.value_tonnes,
    }
    
def create_produced_in(
    *_,
    crop_name: str,
    year: str,
    average_commodity_price: float
):
    
    crop, created = Crop.objects.get_or_create(
        crop_name=crop_name
    )

    season, created = Season.objects.get_or_create(
        year=year
    )

    produced_in, created = ProducedIn.objects.get_or_create(
        crop=crop,
        season=season,
        average_commodity_price=average_commodity_price
    )

    return{
        "crop":{
            "crop_name": crop.crop_name,
        },
        "season":{
            "year": season.year,
        },
        "average_commodity_price": average_commodity_price,
    }

def create_disease(
    *_,
    disease_name: str,
    disease_group: str
):
    
    disease, created = Disease.objects.get_or_create(
        disease_name=disease_name,
        disease_group=disease_group
    )

    return {
        "disease_name": disease.disease_name,
        "disease_group": disease.disease_group
    }

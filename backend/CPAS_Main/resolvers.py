from .models import *
from ariadne_jwt.decorators import login_required, token_auth, staff_member_required

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

@login_required
def list_crop_areas(*_):
    return CropArea.objects.all()

def list_produced_in(*_):
    return ProducedIn.objects.all()

def list_diseases(*_):
    return Disease.objects.all()

@login_required
def list_disease_presence(*_):
    return DiseasePresence.objects.all()

# Mutation

@staff_member_required
def create_zone(*_, zone_name: str):
    zone, created = Zone.objects.get_or_create(
        zone_name=zone_name
    )
    
    return {
        "zone_name": zone.zone_name
    }

@staff_member_required
def create_region(*_, region_name: str):
    region, created = Region.objects.get_or_create(
        region_name=region_name
    )
    
    return {
        "region_name": region.region_name
    }

@staff_member_required
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

@staff_member_required
def create_season(*_, year: str):
    season, created = Season.objects.get_or_create(
        year=year
    )
    
    return {
        "year": season.year
    }

@staff_member_required
def create_crop(*_, crop_name: str):
    crop, created = Crop.objects.get_or_create(
        crop_name=crop_name
    )
    
    return {
        "crop_name": crop.crop_name
    }

@staff_member_required
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
    
@staff_member_required
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

@staff_member_required
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

@staff_member_required
def create_disease_presence(
    *_,
    disease_name: str,
    disease_group: str,
    crop_name: str,
    sub_region: str,
    region_name: str,
    zone_name: str,
    disease_presence_status: str,
    disease_incidence_year_percentage: float,
    disease_incidence_area_percentage: float,
    disease_severity_without_control_percentage: float,
    disease_severity_with_control_percentage: float,
    disease_severity_control_genetic_contribution_percentage: float,
    disease_severity_control_cultural_contribution_percentage: float,
    disease_severity_control_pesticide_contribution_percentage: float,
    fungicide_resistance_risk: str
):
    
    disease, created = Disease.objects.get_or_create(
        disease_name=disease_name,
        disease_group=disease_group
    )
    
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

    disease_presence, created = DiseasePresence.objects.get_or_create(
        disease=disease,
        crop=crop,
        location=location,
        disease_presence_status=disease_presence_status,
        disease_incidence_year_percentage=disease_incidence_year_percentage,
        disease_incidence_area_percentage=disease_incidence_area_percentage,
        disease_severity_without_control_percentage=disease_severity_without_control_percentage,
        disease_severity_with_control_percentage=disease_severity_with_control_percentage,
        disease_severity_control_genetic_contribution_percentage=disease_severity_control_genetic_contribution_percentage,
        disease_severity_control_cultural_contribution_percentage=disease_severity_control_cultural_contribution_percentage,
        disease_severity_control_pesticide_contribution_percentage=disease_severity_control_pesticide_contribution_percentage,
        fungicide_resistance_risk=fungicide_resistance_risk
    )

    return{
        "disease":{
            "disease_name": disease.disease_name,
            "disease_group": disease.disease_group
        },
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
        "disease_presence_status":disease_presence.disease_presence_status,
        "disease_incidence_year_percentage":disease_presence.disease_incidence_year_percentage,
        "disease_incidence_area_percentage":disease_presence.disease_incidence_area_percentage,
        "disease_severity_without_control_percentage":disease_presence.disease_severity_without_control_percentage,
        "disease_severity_with_control_percentage":disease_presence.disease_severity_with_control_percentage,
        "disease_severity_control_genetic_contribution_percentage":disease_presence.disease_severity_control_genetic_contribution_percentage,
        "disease_severity_control_cultural_contribution_percentage":disease_presence.disease_severity_control_cultural_contribution_percentage,
        "disease_severity_control_pesticide_contribution_percentage":disease_presence.disease_severity_control_pesticide_contribution_percentage,
        "fungicide_resistance_risk":disease_presence.fungicide_resistance_risk
    }

@staff_member_required
def addCSVRow(
    *_,
    zone_name: str,
    region_name: str,
    sub_region: str,
    year: str,
    crop_name: str,
    area_hectares: float,
    value_tonnes: float,
    disease_group: str,
    disease_name: str,
    disease_presence_status: str,
    disease_incidence_year_percentage: float,
    disease_incidence_area_percentage: float,
    disease_severity_without_control_percentage: float,
    disease_severity_with_control_percentage: float,
    disease_severity_control_genetic_contribution_percentage: float,
    disease_severity_control_cultural_contribution_percentage: float,
    disease_severity_control_pesticide_contribution_percentage: float,
    average_commodity_price: float,
    fungicide_resistance_risk: str,
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
    season, created = Season.objects.get_or_create(
        year=year
    )
    crop, created = Crop.objects.get_or_create(
        crop_name=crop_name
    )
    crop_area, created = CropArea.objects.get_or_create(
        crop=crop,
        location=location,
        season=season,
        area_hectares=area_hectares,
        value_tonnes=value_tonnes
    )
    produced_in, created = ProducedIn.objects.get_or_create(
        crop=crop,
        season=season,
        average_commodity_price=average_commodity_price
    )
    disease, created = Disease.objects.get_or_create(
        disease_name=disease_name,
        disease_group=disease_group
    )
    disease_presence, created = DiseasePresence.objects.get_or_create(
        disease=disease,
        crop=crop,
        location=location,
        disease_presence_status=disease_presence_status,
        disease_incidence_year_percentage=disease_incidence_year_percentage,
        disease_incidence_area_percentage=disease_incidence_area_percentage,
        disease_severity_without_control_percentage=disease_severity_without_control_percentage,
        disease_severity_with_control_percentage=disease_severity_with_control_percentage,
        disease_severity_control_genetic_contribution_percentage=disease_severity_control_genetic_contribution_percentage,
        disease_severity_control_cultural_contribution_percentage=disease_severity_control_cultural_contribution_percentage,
        disease_severity_control_pesticide_contribution_percentage=disease_severity_control_pesticide_contribution_percentage,
        fungicide_resistance_risk=fungicide_resistance_risk
    )

    return{
        "zone_name": zone.zone_name,
        "region_name": region.region_name,
        "sub_region": location.sub_region,
        "year": season.year,
        "crop_name": crop.crop_name,
        "area_hectares": crop_area.area_hectares,
        "value_tonnes": crop_area.value_tonnes,
        "disease_group": disease.disease_group,
        "disease_name": disease.disease_name,
        "disease_presence_status":disease_presence.disease_presence_status,
        "disease_incidence_year_percentage":disease_presence.disease_incidence_year_percentage,
        "disease_incidence_area_percentage":disease_presence.disease_incidence_area_percentage,
        "disease_severity_without_control_percentage":disease_presence.disease_severity_without_control_percentage,
        "disease_severity_with_control_percentage":disease_presence.disease_severity_with_control_percentage,
        "disease_severity_control_genetic_contribution_percentage":disease_presence.disease_severity_control_genetic_contribution_percentage,
        "disease_severity_control_cultural_contribution_percentage":disease_presence.disease_severity_control_cultural_contribution_percentage,
        "disease_severity_control_pesticide_contribution_percentage":disease_presence.disease_severity_control_pesticide_contribution_percentage,
        "average_commodity_price": average_commodity_price,
        "fungicide_resistance_risk":disease_presence.fungicide_resistance_risk
    }
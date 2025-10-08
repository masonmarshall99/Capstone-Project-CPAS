import pandas as pd
import logging
from .models import (
    Zone, Region, Location, Season,
    Crop, CropArea, ProducedIn, Disease, DiseasePresence
)

logger = logging.getLogger('cpas')  # Make sure this is defined in settings.py

# Method to fill database automatically after migration
def fill_database(sender, **kwargs):
    df = pd.read_csv('CpasData.csv')
    print('Populating database...')
    logger.info('Populating database from CpasData.csv...')

    for index, row in df.iterrows():
        # Fill Zone Table
        try:
            if pd.notna(row['GRDC Agro Ecological Zones']):
                obj, created = Zone.objects.get_or_create(zone_name=row['GRDC Agro Ecological Zones'])
                if created:
                    logger.info(f'Zone created: {obj}')
        except Exception as error:
            logger.error(f'Zone error at row {index}: {error}')

        # Fill Region Table
        try:
            if pd.notna(row['GRDC Regions']):
                obj, created = Region.objects.get_or_create(region_name=row['GRDC Regions'])
                if created:
                    logger.info(f'Region created: {obj}')
        except Exception as error:
            logger.error(f'Region error at row {index}: {error}')

        # Fill Location Table
        try:
            zone = Zone.objects.get(zone_name=row['GRDC Agro Ecological Zones'])
            region = Region.objects.get(region_name=row['GRDC Regions'])

            if pd.notna(row['Sub regions']):
                obj, created = Location.objects.get_or_create(
                    sub_region=row['Sub regions'],
                    region=region,
                    zone=zone
                )
                if created:
                    logger.info(f'Location created: {obj}')
        except Exception as error:
            logger.error(f'Location error at row {index}: {error}')

        # Fill Season Table
        try:
            if pd.notna(row['Season']):
                obj, created = Season.objects.get_or_create(year=row['Season'])
                if created:
                    logger.info(f'Season created: {obj}')
        except Exception as error:
            logger.error(f'Season error at row {index}: {error}')

        # Fill Crops Table
        try:
            if pd.notna(row['Crops']):
                obj, created = Crop.objects.get_or_create(crop_name=row['Crops'])
                if created:
                    logger.info(f'Crop created: {obj}')
        except Exception as error:
            logger.error(f'Crops error at row {index}: {error}')

        # Fill CropArea Table
        try:
            crop = Crop.objects.get(crop_name=row['Crops'])
            location = Location.objects.get(sub_region=row['Sub regions'])
            season = Season.objects.get(year=row['Season'])

            obj, created = CropArea.objects.get_or_create(
                crop=crop,
                location=location,
                season=season,
                defaults={
                    'area_hectares': row.get('Area Hectares', 0),
                    'value_tonnes': row.get('Value Tonnes', 0)
                }
            )
            if created:
                logger.info(f'CropArea created: {obj}')
        except Exception as error:
            logger.error(f'CropArea error at row {index}: {error}')

        # Fill ProducedIn Table
        try:
            crop = Crop.objects.get(crop_name=row['Crops'])
            season = Season.objects.get(year=row['Season'])

            obj, created = ProducedIn.objects.get_or_create(
                crop=crop,
                season=season,
                defaults={
                    'average_commodity_price': row.get('Average Commodity Price', 0)
                }
            )
            if created:
                logger.info(f'ProducedIn created: {obj}')
        except Exception as error:
            logger.error(f'ProducedIn error at row {index}: {error}')

        # Fill Disease Table
        try:
            if pd.notna(row.get('Disease')):
                obj, created = Disease.objects.get_or_create(
                    disease_name=row['Disease'],
                    defaults={'disease_group': row.get('Disease Groups', '')}
                )
                if created:
                    logger.info(f'Disease created: {obj}')
        except Exception as error:
            logger.error(f'Disease error at row {index}: {error}')

        # Fill DiseasePresence Table
        try:
            if pd.notna(row.get('Disease')):
                disease = Disease.objects.get(disease_name=row['Disease'])
                crop = Crop.objects.get(crop_name=row['Crops'])
                location = Location.objects.get(sub_region=row['Sub regions'])

                obj, created = DiseasePresence.objects.get_or_create(
                    disease=disease,
                    crop=crop,
                    location=location,
                    defaults={
                        'disease_presence_status': row.get('Disease Presence Status', ''),
                        'disease_incidence_year_percentage': row.get('Disease Incidence year_Percentage', 0),
                        'disease_incidence_area_percentage': row.get('Disease Incidence Area_Percentage', 0),
                        'disease_severity_without_control_percentage': row.get('Disease Severity without control_Percentage', 0),
                        'disease_severity_with_control_percentage': row.get('Disease Severity with control_Percentage', 0),
                        'disease_severity_control_genetic_contribution_percentage': row.get('Disease Severity Control GeneticContributionPercentage', 0),
                        'disease_severity_control_cultural_contribution_percentage': row.get('Disease Severity Control CulturalContributionPercentage', 0),
                        'disease_severity_control_pesticide_contribution_percentage': row.get('Disease Severity Control PesticideContributionPercentage', 0),
                        'fungicide_resistance_risk': row.get('FungicideResistanceRisk', '')
                    }
                )
                if created:
                    logger.info(f'DiseasePresence created: {obj}')
        except Exception as error:
            logger.error(f'DiseasePresence error at row {index}: {error}')
    
    print('Database population completed successfully.')
    logger.info('Database population completed successfully.')

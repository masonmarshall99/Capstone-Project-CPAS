import pandas as pd
from .models import Zone, Location, Season, Crops, CropArea, ProducedIn, Disease, DiseasePresence

# Method to fill database automatically after migration
def fill_database(sender, **kwargs):
    
    df = pd.read_csv('CpasData.csv')
    print('Populating database...')

    for index, row in df.iterrows():
        # Fill Zone Table
        try:
            if pd.notna(row['GRDC Agro Ecological Zones']):
                Zone.objects.get_or_create(zone_name=row['GRDC Agro Ecological Zones'])
        except Exception as error:
            print(f'Zone error at row {index}: {error}')

        #Fill Location Table
        try:
            zone = Zone.objects.get(zone_name=row['GRDC Agro Ecological Zones'])
            
            if pd.notna(row['Sub regions']):
                Location.objects.get_or_create(
                    sub_region=row['Sub regions'],
                    region=row.get('GRDC Regions', ''),
                    zone=zone
                )
        except Exception as error:
            print(f'Location error at row {index}: {error}')

        #Fill Season Table
        try:
            if pd.notna(row['Season']):
                Season.objects.get_or_create(year=row['Season'])
        except Exception as error:
            print(f'Season error at row {index}: {error}')

        #Fill Crops Table
        try:
            if pd.notna(row['Crops']):
                Crops.objects.get_or_create(crop_name=row['Crops'])
        except Exception as error:
            print(f'Crops error at row {index}: {error}')

        #Fill CropArea Table
        try:
            crop = Crops.objects.get(crop_name=row['Crops'])
            location = Location.objects.get(sub_region=row['Sub regions'])
            season = Season.objects.get(year=row['Season'])

            CropArea.objects.get_or_create(
                crop=crop,
                sub_region=location,
                year=season,
                defaults={
                    'area_hectares': row.get('Area Hectares', 0),
                    'value_tonnes': row.get('Value Tonnes', 0)
                }
            )
        except Exception as error:
            print(f'CropArea error at row {index}: {error}')

        #Fill ProducedIn Table
        try:
            crop = Crops.objects.get(crop_name=row['Crops'])
            season = Season.objects.get(year=row['Season'])

            ProducedIn.objects.get_or_create(
                crop=crop,
                year=season,
                defaults={
                    'average_commodity_price': row.get('Average Commodity Price', 0)
                }
            )
        except Exception as error:
            print(f'ProducedIn error at row {index}: {error}')

        #Fill Disease Table
        try:
            if pd.notna(row.get('Disease')):
                disease = Disease.objects.get_or_create(
                    disease_name=row['Disease'],
                    defaults={'disease_group': row.get('Disease Groups', '')}
                )
        except Exception as error:
            print(f'Disease error at row {index}: {error}')

        #Fill DiseasePresence Table
        try:
            if pd.notna(row.get('Disease')):
                disease = Disease.objects.get(disease_name=row['Disease'])
                crop = Crops.objects.get(crop_name=row['Crops'])
                location = Location.objects.get(sub_region=row['Sub regions'])

                DiseasePresence.objects.get_or_create(
                    disease=disease,
                    crop=crop,
                    sub_region=location,
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
        except Exception as error:
            print(f'DiseasePresence error at row {index}: {error}')

    print('Database populated successfully.')

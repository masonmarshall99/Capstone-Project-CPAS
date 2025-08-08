from django.test import TestCase
from CPAS_Main.models import Zone, Season, Crops, Disease, Location, CropArea, ProducedIn, DiseasePresence

# Create your tests here.

class MinimalModelTestCase(TestCase):
    #Create test objects
    def setUp(self):
        self.zone = Zone.objects.create(zone_name="ExampleZoneName")
        self.season = Season.objects.create(year="2021/22")
        self.crop = Crops.objects.create(crop_name="ExampleCropName")
        self.disease = Disease.objects.create(disease_name="ExampleDiseaseName", disease_group="ExampleDiseaseGroup")
        self.location = Location.objects.create(sub_region="ExampleSubRegion", region="ExampleRegion", zone=self.zone)

    #Check if objects exist and are unique
    def test_zone_creation(self):
        self.assertEqual(self.zone.zone_name, "ExampleZoneName")
        self.assertEqual(Zone.objects.count(), 1)

    def test_season_creation(self):
        self.assertEqual(self.season.year, "2021/22")
        self.assertEqual(Season.objects.count(), 1)

    def test_crop_creation(self):
        self.assertEqual(self.crop.crop_name, "ExampleCropName")
        self.assertEqual(Crops.objects.count(), 1)

    def test_disease_creation(self):
        self.assertEqual(self.disease.disease_name, "ExampleDiseaseName")
        self.assertEqual(self.disease.disease_group, "ExampleDiseaseGroup")
        self.assertEqual(Disease.objects.count(), 1)

    #Check if objects exist, are unique and confirms foreign key link
    def test_location_creation(self):
        self.assertEqual(self.location.sub_region, "ExampleSubRegion")
        self.assertEqual(self.location.region, "ExampleRegion")
        self.assertEqual(self.location.zone.zone_name, "ExampleZoneName")
        self.assertEqual(Location.objects.count(), 1)

    def test_crop_area_creation_and_unique_together(self):
        area = CropArea.objects.create(
            crop=self.crop,
            sub_region=self.location,
            year=self.season,
            area_hectares=1234.56,
            value_tonnes=1234.56
        )
        self.assertEqual(area.area_hectares, 1234.56)

        #Try to create duplicate CropArea (ensure uniqueness)
        with self.assertRaises(Exception):
            CropArea.objects.create(
                crop=self.crop,
                sub_region=self.location,
                year=self.season,
                area_hectares=1234.56,
                value_tonnes=1234.56
            )

    def test_produced_in_creation_and_unique_together(self):
        prod = ProducedIn.objects.create(
            crop=self.crop,
            year=self.season,
            average_commodity_price=123.45
        )
        self.assertEqual(prod.average_commodity_price, 123.45)

        #Try to create duplicate ProducedIn (ensure uniqueness)
        with self.assertRaises(Exception):
            ProducedIn.objects.create(
                crop=self.crop,
                year=self.season,
                average_commodity_price=123.45
            )

    def test_disease_presence_creation_and_unique_together(self):
        dp = DiseasePresence.objects.create(
            disease=self.disease,
            crop=self.crop,
            sub_region=self.location,
            disease_presence_status="Y",
            disease_incidence_year_percentage=50,
            disease_incidence_area_percentage=80,
            disease_severity_without_control_percentage=1,
            disease_severity_with_control_percentage=0.1,
            disease_severity_control_genetic_contribution_percentage=25,
            disease_severity_control_cultural_contribution_percentage=65,
            disease_severity_control_pesticide_contribution_percentage=10,
            fungicide_resistance_risk="Yes"
        )
        self.assertEqual(dp.fungicide_resistance_risk, "Yes")

        #Try to create duplicate DiseasePresence (ensure uniqueness)
        with self.assertRaises(Exception):
            DiseasePresence.objects.create(
                disease=self.disease,
                crop=self.crop,
                sub_region=self.location,
                disease_presence_status="Y",
                disease_incidence_year_percentage=50,
                disease_incidence_area_percentage=80,
                disease_severity_without_control_percentage=1,
                disease_severity_with_control_percentage=0.1,
                disease_severity_control_genetic_contribution_percentage=25,
                disease_severity_control_cultural_contribution_percentage=65,
                disease_severity_control_pesticide_contribution_percentage=10,
                fungicide_resistance_risk="Yes"
            )

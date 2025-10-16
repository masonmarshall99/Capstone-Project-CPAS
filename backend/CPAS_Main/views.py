from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
import json
import csv
import io

from django.contrib.auth import get_user_model, authenticate, login, logout
from .serializers import serializeUser
from .pdf_utils import create_crop_report_pdf
from .models import Crop, CropArea, Disease, DiseasePresence, Location, Season

# Ariadne testing view imports
from ariadne.wsgi import GraphQL
from CPAS.graphql_config import schema
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, csrf_protect
graphql_app = GraphQL(schema, debug=True)

# Define user class
User = get_user_model()

# Required REST API Endpoints for CPAS

# Feature B01c Cookie Handling
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'}, status=200)
# Add any other cookie related views here

# Feature B01a User Creation Functionality
@csrf_protect
def create_user(request):
    if request.method == 'POST':
        # Load json data from frontend POST request
        data = json.loads(request.body)
        # Collect information from the post request
        new_password = data.get('password')
        new_first_name = data.get('name')
        new_last_name = data.get('lastName')
        new_email = data.get('email')
        
        if User.objects.filter(email = new_email).exists():
            return JsonResponse({'message': 'Email address unavailable'}, status = 400)

        # If user doesn't exist, create new user and return success message
        new_user = User.objects.create_user(
            password = new_password,
            first_name = new_first_name,
            last_name = new_last_name,
            email = new_email
        )
        user = authenticate(request, email=new_email, password=new_password)

        # Log the new user in
        login(request, user)

        return JsonResponse({'message': 'User created successfully', 'user': serializeUser(user).data}, status=201)

# Feature B01b User Login Functionality
@csrf_protect
def login_user(request):
        if request.method != 'POST':
            return JsonResponse({'message': 'Method not allowed'}, status=405)

        try:
            data = json.loads(request.body)
        except Exception:
            return JsonResponse({'message': 'Invalid JSON body'}, status=400)

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'message': 'Email and password are required'}, status=400)

        user = authenticate(request, email=email, password=password)
        if user is None:
            return JsonResponse({'message': 'Invalid email or password'}, status=401)

        login(request, user)
        return JsonResponse({'message': 'Login successful', 'user': serializeUser(user).data}, status=200)

# Feature B01f User logout
@csrf_protect    
def logout_user(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'message': 'User logged out successfully'}, status=200)
    else:
        return JsonResponse({'message': 'No user is currently logged in'}, status=400)

# Feature B08 User detail editing
# To be tested
@csrf_protect
def edit_user(request):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            user = request.user
            
            """# Check current password
            current_password = data.get('currentPassword')
            if not user.check_password(current_password):
                return JsonResponse({'message': 'Current password is incorrect'}, status=400)
            else:"""
                # Update user details if provided
            new_first_name = data.get('firstName')
            new_last_name = data.get('lastName')
            new_email = data.get('email')
            new_password = data.get('newPassword')

            if new_first_name:
                user.first_name = new_first_name
            if new_last_name:
                user.last_name = new_last_name
            if new_email:
                if User.objects.filter(email=new_email).exclude(id=user.id).exists():
                    return JsonResponse({'message': 'Email address unavailable'}, status=400)
                user.email = new_email
            if new_password:
                user.set_password(new_password)

            user.save()

            return JsonResponse({'message': 'User details updated successfully', 'user': serializeUser(user).data}, status=200)


# Feature B01g whoami
# Testing required
@csrf_protect
def whoami(request):
        if request.user.is_authenticated:
            return JsonResponse({'user': serializeUser(request.user).data}, status=200)
        else:
            return JsonResponse({'message': 'No user logged in'}, status=400)

@csrf_exempt
def graphql_testing_view(request):
    response_body = []

    def start_response(status, response_headers, exc_info=None):
        nonlocal response_status, response_headers_list
        response_status = status
        response_headers_list = response_headers
        return response_body.append
    
    response_status = None
    response_headers_list = []

    result = graphql_app(request.META, start_response)

    for data in result:
        response_body.append(data)

    status_code = int(response_status.split(" ")[0])
    response = HttpResponse(b"".join(response_body), status=status_code)

    for header_name, header_value in response_headers_list:
        response[header_name] = header_value
    return response


# PDF Download System Views

@csrf_protect
def download_crop_report_pdf(request, crop_id):
    """Download PDF report for a specific crop"""
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Authentication required'}, status=401)
    
    try:
        # Get crop data
        crop = get_object_or_404(Crop, crop_name=crop_id)
        
        # Get related data
        crop_areas = CropArea.objects.filter(crop=crop).select_related('location', 'season')
        
        if not crop_areas.exists():
            return JsonResponse({'message': 'No crop area data found'}, status=404)
        
        # Get the first crop area for basic info
        crop_area = crop_areas.first()
        location = crop_area.location
        season = crop_area.season
        
        # Prepare data for PDF
        crop_data = {
            'crop_name': crop.crop_name,
            'area_hectares': crop_area.area_hectares,
            'value_tonnes': crop_area.value_tonnes
        }
        
        location_data = {
            'sub_region': location.sub_region,
            'region': location.region.region_name,
            'zone': location.zone.zone_name
        }
        
        season_data = {
            'year': season.year
        }
        
        # Generate PDF
        pdf_content = create_crop_report_pdf(crop_data, location_data, season_data)
        
        # Create HTTP response
        response = HttpResponse(pdf_content, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="crop_report_{crop.crop_name}_{season.year}.pdf"'
        
        return response
        
    except Exception as e:
        return JsonResponse({'message': f'Error generating PDF: {str(e)}'}, status=500)


# Crop Health Data Download System Views

@csrf_exempt
def download_crop_health_data(request):
    """Download crop health data as CSV file"""
    
    try:
        # Get all disease presence data with related objects
        disease_presence_data = DiseasePresence.objects.select_related(
            'disease', 'crop', 'location', 'location__region', 'location__zone'
        ).all()
        
        if not disease_presence_data.exists():
            return JsonResponse({'message': 'No crop health data found'}, status=404)
        
        # Create CSV content
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write CSV headers
        headers = [
            'Disease Name',
            'Disease Group',
            'Crop Name',
            'Sub Region',
            'Region',
            'Zone',
            'Disease Presence Status',
            'Disease Incidence Year (%)',
            'Disease Incidence Area (%)',
            'Disease Severity Without Control (%)',
            'Disease Severity With Control (%)',
            'Genetic Control Contribution (%)',
            'Cultural Control Contribution (%)',
            'Pesticide Control Contribution (%)',
            'Fungicide Resistance Risk'
        ]
        writer.writerow(headers)
        
        # Write data rows
        for dp in disease_presence_data:
            row = [
                dp.disease.disease_name,
                dp.disease.disease_group or '',
                dp.crop.crop_name,
                dp.location.sub_region,
                dp.location.region.region_name,
                dp.location.zone.zone_name,
                dp.disease_presence_status,
                dp.disease_incidence_year_percentage,
                dp.disease_incidence_area_percentage,
                dp.disease_severity_without_control_percentage or '',
                dp.disease_severity_with_control_percentage or '',
                dp.disease_severity_control_genetic_contribution_percentage or '',
                dp.disease_severity_control_cultural_contribution_percentage or '',
                dp.disease_severity_control_pesticide_contribution_percentage or '',
                dp.fungicide_resistance_risk
            ]
            writer.writerow(row)
        
        # Get CSV content
        csv_content = output.getvalue()
        output.close()
        
        # Create HTTP response
        response = HttpResponse(csv_content, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="crop_health_data.csv"'
        
        return response
        
    except Exception as e:
        return JsonResponse({'message': f'Error generating CSV: {str(e)}'}, status=500)


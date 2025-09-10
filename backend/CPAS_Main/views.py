from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

from django.contrib.auth import get_user_model, authenticate, login
from .serializers import serializeUser

# Ariadne testing view imports
from ariadne.wsgi import GraphQL
from CPAS.graphql_config import schema
from django.views.decorators.csrf import csrf_exempt
graphql_app = GraphQL(schema, debug=True)

# Define user class
User = get_user_model()

# Create your views here.

# Testing frontend/backend connection
def test(request):
    return HttpResponse("Welcome to CPAS")

# Feature B01a User Creation Functionality
# CSRF Exempt decorator used for testing. To be removed when frontend connected
@csrf_exempt
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

        return JsonResponse({'message': 'User created successfully', 'user': serializeUser(user).data})


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
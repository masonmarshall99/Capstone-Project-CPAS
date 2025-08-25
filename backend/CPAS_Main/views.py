from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from django.contrib.auth import get_user_model, authenticate

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
        # Collect information from the post request
        #new_username = request.POST.get('name')
        new_password = request.POST.get('password')
        new_first_name = request.POST.get('first_name')
        new_last_name = request.POST.get('last_name')
        new_email = request.POST.get('email')

        # Check if user with this username already exists. return error if so
        if User.objects.filter(email = new_email):
            return JsonResponse({'error': 'Email already in use'}, status = 400)
        
        if User.objects.filter(email = new_email):
            return JsonResponse({'error': 'Email address unavailable'}, status = 400)

        # If user doesn't exist, create new user and return success message
        new_user = User.objects.create_user(
            #username = new_username,
            password = new_password,
            first_name = new_first_name,
            last_name = new_last_name,
            email = new_email
        )

        user = authenticate(email = new_email, password = new_password)

        return JsonResponse({'message': 'User created successfully'})


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
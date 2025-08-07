from django.shortcuts import render
from django.http import HttpResponse

# Ariadne testing view imports
from ariadne.wsgi import GraphQL
from CPAS_Main.schema import schema
from django.views.decorators.csrf import csrf_exempt
graphql_app = GraphQL(schema, debug=True)

# Create your views here.

# Testing frontend/backend connection
def test(request):
    return HttpResponse("Welcome to CPAS")

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
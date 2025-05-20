from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# Testing frontend/backend connection
def test(request):
    return HttpResponse("Welcome to CPAS")
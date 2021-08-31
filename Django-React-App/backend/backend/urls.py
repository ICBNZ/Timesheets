from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
# from rest_framework import routers

urlpatterns = [
    url(r'^', include('api.urls',)),
    url(r'^', include('mytimesheets.urls',)),
]

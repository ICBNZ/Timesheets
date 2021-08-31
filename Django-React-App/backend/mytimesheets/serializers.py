from rest_framework import serializers
from .models import Day, Timesheet
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model


class DaySerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format="%m/%d/%Y", input_formats=['%m/%d/%Y', 'iso-8601'])
    start = serializers.TimeField(format='%H:%M')
    end = serializers.TimeField(format='%H:%M')

    class Meta:
        model = Day
        fields = ['id', 'timesheet', 'date', 'day', 'start',
                  'end', 'meal', 'total', 'created', 'updated']


class TimesheetSerializer(serializers.ModelSerializer):
    days = DaySerializer(source='timesheet', read_only=True, many=True)

    class Meta:
        model = Timesheet
        fields = ['id', 'user', 'week', 'days',
                  'client', 'signed', 'submitted']

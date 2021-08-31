from django.db import models
from datetime import date
from django.contrib.auth.models import User


class Timesheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week = models.TextField(default="", null=True, blank=True)
    client = models.TextField(default="", null=True, blank=True)
    signed = models.BooleanField(default=False)
    submitted = models.BooleanField(default=False)

    def __str__(self):
        return self.signed


class Day(models.Model):
    date = models.DateField(default=date.today)
    day = models.TextField(default="")
    start = models.TimeField(auto_now=False)
    end = models.TimeField(auto_now=False)
    meal = models.TextField(default="-")
    total = models.TextField(default="")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    timesheet = models.ForeignKey(
        Timesheet, on_delete=models.CASCADE, default=1, null=True,
        related_name="timesheet")

    def __str__(self):
        return self.date

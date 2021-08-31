from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenVerifyView,
)
from .views import TimesheetView, TimesheetDetail, DayView, DayDetailView

urlpatterns = [
    # Timesheets List
    path('timesheet/', TimesheetView.as_view()),

    # Add New Timesheet
    path('timesheet/add', TimesheetView.as_view()),

    # Get, Update, Delete Timesheet By Timesheet ID
    path('timesheet/<int:pk>/', TimesheetDetail.as_view()),

    # Add Day to Timesheet
    path('timesheet/<int:pk>/day/', DayView.as_view()),

    # Get, Update, Delete Day
    path('timesheet/day/<int:pk>/', DayDetailView.as_view()),

]

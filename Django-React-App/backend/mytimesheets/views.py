from .models import Day, Timesheet
from .serializers import DaySerializer, TimesheetSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateDestroyAPIView


class TimesheetView(generics.ListCreateAPIView):
    """ Timesheet List View - filtered by user ID """
    serializer_class = TimesheetSerializer
    permission_classes = [IsAuthenticated, ]  # check authenticated

    # filter by id
    def get_queryset(self):
        user = self.request.user.id
        if user is not None:
            queryset = Timesheet.objects.filter(user=user)
        else:
            queryset = Timesheet.objects.all()
        return queryset


class TimesheetDetail(RetrieveUpdateDestroyAPIView):
    """ Timesheet Detail View - filter by timesheet ID
    Get, Update, Delete """
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer
    permission_classes = [IsAuthenticated, ]


class DayView(generics.ListCreateAPIView):
    """ Day List View - filtered by timesheet ID """
    serializer_class = DaySerializer
    permission_classes = [IsAuthenticated, ]

    # Filter queryset by timesheet
    def get_queryset(self):
        timesheet_id = self.kwargs['pk']
        if timesheet_id is not None:
            queryset = Day.objects.filter(timesheet=timesheet_id)
        else:
            queryset = Day.objects.all()
        return queryset


class DayDetailView(RetrieveUpdateDestroyAPIView):
    """ Individual Day View """
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [IsAuthenticated, ]

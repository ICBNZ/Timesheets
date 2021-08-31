from rest_framework import generics, permissions
from .serializers import RegisterUserSerializer, UserSerializer, MyTokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView


class UserRegister(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = RegisterUserSerializer

    def post(self, request, format='json'):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserProfileView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):

        user = self.kwargs['pk']
        if user is not None:
            queryset = User.objects.filter(id=user)
        else:
            queryset = None
        return queryset


class HomeView(APIView):
    permission_classes = [IsAuthenticated, ]

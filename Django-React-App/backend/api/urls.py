
from rest_framework_simplejwt import views as jwt_views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from .views import MyTokenObtainPairView, UserRegister, UserProfileView, HomeView
from . import views
from django.conf.urls import url


urlpatterns = [
    path('signup/',  UserRegister.as_view(), name="create_user"),
    path('login/',  MyTokenObtainPairView.as_view(), name='token_obtain'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token-verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('profile/<int:pk>', UserProfileView.as_view(), name='user'),
    path('home/', HomeView.as_view(), name='home'),
]

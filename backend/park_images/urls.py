from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'parks', views.ParkViewSet)
router.register(r'park-images', views.ParkImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
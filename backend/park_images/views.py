from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Park, ParkImage
from .serializers import ParkSerializer, ParkImageSerializer

class ParkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Park.objects.all()
    serializer_class = ParkSerializer
    
    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        park = self.get_object()
        images = park.images.all()
        serializer = ParkImageSerializer(images, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_image_key(self, request):
        image_key = request.query_params.get('image_key', None)
        if image_key:
            park = get_object_or_404(Park, image_key=image_key)
            serializer = self.get_serializer(park)
            return Response(serializer.data)
        return Response({'error': 'Park image_key required'}, status=status.HTTP_400_BAD_REQUEST)

class ParkImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkImage.objects.all()
    serializer_class = ParkImageSerializer
    
    def get_queryset(self):
        queryset = ParkImage.objects.all()
        park_code = self.request.query_params.get('park', None)
        featured_only = self.request.query_params.get('featured', None)
        default_only = self.request.query_params.get('default', None)
        
        if park_code:
            queryset = queryset.filter(image_key=park_code)
        if featured_only:
            queryset = queryset.filter(is_featured=True)
        if default_only:
            queryset = queryset.filter(is_featured=False)
            
        return queryset
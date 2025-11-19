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
    def by_code(self, request):
        code = request.query_params.get('code', None)
        if code:
            park = get_object_or_404(Park, code=code.lower())
            serializer = self.get_serializer(park)
            return Response(serializer.data)
        return Response({'error': 'Park code required'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def by_state(self, request):
        state = request.query_params.get('state', None)
        if state:
            parks = Park.objects.filter(state__icontains=state)
            serializer = self.get_serializer(parks, many=True)
            return Response(serializer.data)
        return Response({'error': 'State parameter required'}, status=status.HTTP_400_BAD_REQUEST)

class ParkImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParkImage.objects.all()
    serializer_class = ParkImageSerializer
    
    def get_queryset(self):
        queryset = ParkImage.objects.all()
        # park_code = self.request.query_params.get('park', None)
        featured_only = self.request.query_params.get('featured', None)
        default_only = self.request.query_params.get('default', None)
        
        # if park_code:
        #     queryset = queryset.filter(park__code=park_code.lower())
        if featured_only:
            queryset = queryset.filter(is_featured=True)
        if default_only:
            queryset = queryset.filter(is_featured=False)
            
        return queryset
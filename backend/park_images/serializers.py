from rest_framework import serializers
from .models import Park, ParkImage

class ParkImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    park_name = serializers.CharField(source='park.name', read_only=True) 
    
    class Meta:
        model = ParkImage
        fields = ['id', 'display_name', 'image_url', 'is_featured', 'upload_date']  
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(f'/assets/{obj.image_path}')
        return f'/assets/{obj.image_path}'

class ParkSerializer(serializers.ModelSerializer):
    images = ParkImageSerializer(many=True, read_only=True)
    default_image = serializers.SerializerMethodField()
    featured_images = serializers.SerializerMethodField()
    
    class Meta:
        model = Park
        fields = [
            'id', 'name', 'display_name', 'wikipedia_link', 
            'state', 'coordinates', 'date_established', 'area', 
            'visitors', 'description', 'images', 'default_image', 'featured_images'
        ]
    
    def get_default_image(self, obj):
        # Default image is the one from DefaultImages folder (is_featured=False)
        default = obj.images.filter(is_featured=False).first()
        if default:
            serializer = ParkImageSerializer(default, context=self.context)
            return serializer.data
        return None
    
    def get_featured_images(self, obj):
        # Featured images are from the park's specific folder (is_featured=True)
        featured = obj.images.filter(is_featured=True)
        serializer = ParkImageSerializer(featured, many=True, context=self.context)
        return serializer.data
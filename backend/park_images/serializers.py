from rest_framework import serializers
from .models import Park, ParkImage

class ParkImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ParkImage
        fields = ['id', 'image_name', 'image_url', 'is_featured', 'upload_date']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(f'/assets/{obj.image_path}')
        return f'/assets/{obj.image_path}'

class ParkSerializer(serializers.ModelSerializer):
    images = ParkImageSerializer(many=True, read_only=True)
    featured_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Park
        fields = ['id', 'name', 'code', 'display_name', 'images', 'featured_image']
    
    def get_featured_image(self, obj):
        featured = obj.images.filter(is_featured=True).first()
        if featured:
            serializer = ParkImageSerializer(featured, context=self.context)
            return serializer.data
        return None
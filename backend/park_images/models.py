from django.db import models

class Park(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50, unique=True)  # e.g., "acadia", "badlands"
    display_name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.display_name

class ParkImage(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE, related_name='images')
    image_name = models.CharField(max_length=255)
    image_path = models.CharField(max_length=500)  # Relative path to the image
    upload_date = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-is_featured', '-upload_date']
    
    def __str__(self):
        return f"{self.park.name} - {self.image_name}"
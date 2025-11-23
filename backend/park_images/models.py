from django.db import models

class Park(models.Model):
    display_name = models.CharField(max_length=200)
    image_key = models.CharField(max_length=250)
    wikipedia_link = models.URLField(blank=True)
    state = models.CharField(max_length=100, blank=True)
    coordinates = models.CharField(max_length=200, blank=True)
    date_established = models.CharField(max_length=100, blank=True)
    area = models.CharField(max_length=100, blank=True)
    visitors = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.display_name

class ParkImage(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE, related_name='images')
    display_name = models.CharField(max_length=255)
    image_key = models.CharField(max_length=200, blank=True)
    image_path = models.CharField(max_length=500)
    upload_date = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)  
    
    class Meta:
        ordering = ['-is_featured', '-upload_date']
    
    def __str__(self):
        return f"{self.park.name} - {self.display_name}"
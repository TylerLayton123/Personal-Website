from django.contrib import admin
from .models import Park, ParkImage

class ParkImageInline(admin.TabularInline):
    model = ParkImage
    extra = 1
    fields = ['image_name', 'image_path', 'is_featured']

@admin.register(Park)
class ParkAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'display_name', 'state']
    list_filter = ['state']
    search_fields = ['name', 'display_name', 'state']
    inlines = [ParkImageInline]

@admin.register(ParkImage)
class ParkImageAdmin(admin.ModelAdmin):
    list_display = ['image_name', 'park', 'is_featured', 'upload_date']
    list_filter = ['park', 'is_featured']
    search_fields = ['image_name', 'park__name']
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from park_images.park_info import park_data

from park_images.models import Park, ParkImage

class Command(BaseCommand):
    help = 'Load all national parks with default images and optional featured photos'
    
    def handle(self, *args, **options):
        assets_base = os.path.join(settings.BASE_DIR.parent, 'images', 'ParkImages')
        default_images_path = os.path.join(assets_base, 'DefaultImages')
        
        self.stdout.write(f"Loading {len(park_data)} parks from park_data...")
        
        for park_info in park_data:
            # Create or update park
            park, created = Park.objects.update_or_create(
                image_key=park_info['image_key'],
                defaults={
                    'display_name': park_info['name'],
                    'wikipedia_link': park_info['link'],
                    'state': park_info['state'],
                    'coordinates': park_info['coordinates'],
                    'date_established': park_info['date_established'],
                    'area': park_info['area'],
                    'visitors': park_info['visitors'],
                    'description': park_info['description']
                }
            )
            
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created park: {park.display_name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Updated park: {park.display_name}'))
            
            # Handle images for this park - default is required, featured are optional
            self.load_park_images(park, park_info['image_key'], assets_base, default_images_path)
    
    def load_park_images(self, park, image_key, assets_base, default_images_path):
        # First, set the default image (required for every park)
        default_set = self.set_default_image(park, image_key, default_images_path)
        
        if not default_set:
            self.stdout.write(self.style.ERROR(f'  ERROR: No default image found for {park.display_name}. Every park must have a default image.'))
        
        # Then, load optional featured images from the park's folder
        self.load_featured_images(park, image_key, assets_base)
    
    def set_default_image(self, park, image_key, default_images_path):
        """Set the default image from DefaultImages folder - REQUIRED for every park"""
        if not os.path.exists(default_images_path):
            self.stdout.write(self.style.ERROR(f'DefaultImages folder not found at {default_images_path}'))
            return False
            
        # Try different filename variations
        possible_default_names = [
            f"{image_key}.jpg", f"{image_key}.JPG", f"{image_key}.jpeg", f"{image_key}.JPEG",
            f"{image_key}.png", f"{image_key}.PNG", f"{image_key}.webp", f"{image_key}.WEBP",
            f"{image_key.replace(' ', '_')}.jpg", f"{image_key.replace(' ', '_')}.JPG",
            f"{image_key.replace(' ', '')}.jpg", f"{image_key.replace(' ', '')}.JPG",
        ]
        
        default_filename = None
        for filename in possible_default_names:
            test_path = os.path.join(default_images_path, filename)
            if os.path.exists(test_path):
                default_filename = filename
                break
        
        if default_filename:
            default_image_path = f"images/ParkImages/DefaultImages/{default_filename}"
            
            # Create or update the default image
            ParkImage.objects.update_or_create(
                park=park,
                image_path=default_image_path,  
                defaults={
                    'is_featured': False,  
                    'display_name': park.display_name,
                    'image_key': image_key
                }
            )
            self.stdout.write(self.style.SUCCESS(f'  Set default image: {default_filename}'))
            return True
        else:
            return False
    
    def load_featured_images(self, park, image_key, assets_base):
        """Load optional featured images from the park's specific folder"""
        # Try to find the park folder
        possible_folders = [
            image_key,
            image_key.replace(' ', '_'),
            image_key.replace(' ', ''),
        ]
        
        park_folder = None
        for folder in possible_folders:
            test_path = os.path.join(assets_base, folder)
            if os.path.exists(test_path) and os.path.isdir(test_path):
                park_folder = folder
                break
        
        if park_folder:
            park_path = os.path.join(assets_base, park_folder)
            image_files = []
            
            # Get all image files from the park folder
            for filename in os.listdir(park_path):
                if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                    image_files.append(filename)
            
            if image_files:
                featured_count = 0
                for filename in image_files:
                    image_path = f"images/ParkImages/{park_folder}/{filename}"
                    
                    # Create featured image (is_featured=True)
                    obj, created = ParkImage.objects.get_or_create(
                        park=park,
                        image_path=image_path,
                        defaults={
                            'is_featured': True,  
                            'display_name': park.display_name,
                            'image_key': park.image_key
                        }
                    )
                    if created:
                        featured_count += 1
                
                self.stdout.write(self.style.SUCCESS(f'  Added {featured_count} featured images for {park.display_name}'))
            else:
                self.stdout.write(self.style.WARNING(f'  No featured images found for {park.display_name}'))
        else:
            self.stdout.write(self.style.WARNING(f'  No park folder found for {park.display_name} (featured images optional)'))
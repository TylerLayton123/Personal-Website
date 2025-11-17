import os
from django.core.management.base import BaseCommand
from park_images.models import Park, ParkImage

class Command(BaseCommand):
    help = 'Load existing park images from assets folder into database'
    
    def handle(self, *args, **options):
        assets_base = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'assets', 'images', 'ParkImages')
        
        parks_data = {
            'acadia': 'Acadia',
            'badlands': 'Badlands',
            'congaree': 'Congaree',
            'cuyahoga_valley': 'Cuyahoga Valley',
            'grand_canyon': 'Grand Canyon',
            'great_smoky_mountains': 'Great Smoky Mountains',
            'haleakala': 'Haleakala',
            'indiana_dunes': 'Indiana Dunes',
            'isle_royale': 'Isle Royale',
            'mammoth_cave': 'Mammoth Cave',
        }
        
        for park_code, park_name in parks_data.items():
            park, created = Park.objects.get_or_create(
                code=park_code,
                defaults={
                    'name': park_code,
                    'display_name': park_name
                }
            )
            
            if created:
                self.stdout.write(f'Created park: {park_name}')
            
            park_path = os.path.join(assets_base, park_name.replace(' ', '_'))
            
            if os.path.exists(park_path):
                for filename in os.listdir(park_path):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                        image_path = f"images/ParkImages/{park_name.replace(' ', '_')}/{filename}"
                        
                        ParkImage.objects.get_or_create(
                            park=park,
                            image_name=filename,
                            defaults={
                                'image_path': image_path,
                                'is_featured': False
                            }
                        )
                        self.stdout.write(f'Added image: {filename} for {park_name}')
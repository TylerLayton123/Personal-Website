from django.core.management.base import BaseCommand
from django.db import connection
from park_images.models import Park, ParkImage

class Command(BaseCommand):
    help = 'Delete all parks and park images from the database and reset IDs'
    
    def handle(self, *args, **options):
        # Confirm deletion for safety
        confirm = input(
            "WARNING: This will delete ALL parks and park images from the database.\n"
            "This action cannot be undone. Type 'y' to confirm: "
        )
        
        if confirm != "y":
            self.stdout.write(self.style.ERROR('Deletion cancelled.'))
            return
        
        # Delete all park images first
        park_images_count = ParkImage.objects.count()
        ParkImage.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {park_images_count} park images'))
        
        # Delete all parks
        parks_count = Park.objects.count()
        Park.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {parks_count} parks'))
        
        # Reset SQLite auto-increment counter
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='park_images_park'")
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='park_images_parkimage'")
        
        self.stdout.write(self.style.SUCCESS('Successfully cleared all park data and reset IDs'))
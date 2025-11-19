from django.core.management.base import BaseCommand
from park_images.models import Park, ParkImage

class Command(BaseCommand):
    help = 'Delete all parks and park images from the database'
    
    def handle(self, *args, **options):
        # Confirm deletion for safety
        confirm = input(
            "WARNING: This will delete ALL parks and park images from the database.\n"
            "This action cannot be undone. Type 'Y' to confirm: "
        )
        
        if confirm != "y" or confirm != "Y":
            self.stdout.write(self.style.ERROR('Deletion cancelled.'))
            return
        
        # Delete all park images first (to maintain foreign key constraints)
        park_images_count = ParkImage.objects.count()
        ParkImage.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {park_images_count} park images'))
        
        # Delete all parks
        parks_count = Park.objects.count()
        Park.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {parks_count} parks'))
        
        self.stdout.write(self.style.SUCCESS('Successfully cleared all park data from database'))
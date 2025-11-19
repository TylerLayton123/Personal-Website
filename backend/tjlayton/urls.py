from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('park_images.urls')),
]

# Serve static files
urlpatterns += staticfiles_urlpatterns()

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Serve assets folder
    urlpatterns += static('/static/assets/', document_root=settings.ASSETS_ROOT)
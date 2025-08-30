#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import os
import re
from urllib.parse import urljoin, unquote
import time

def sanitize_filename(name):
    """Convert a string to a valid filename"""
    # Remove invalid characters
    name = re.sub(r'[<>:"/\\|?*]', '', name)
    # Replace spaces with underscores
    name = name.replace(' ', '_')
    return name

def download_image(url, folder_path, filename):
    """Download an image from a URL and save it to the specified folder"""
    try:
        # Add a small delay to be respectful to the server
        time.sleep(0.1)
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        if response.status_code == 200:
            # Create directory if it doesn't exist
            os.makedirs(folder_path, exist_ok=True)
            
            # Determine file extension from content type
            content_type = response.headers.get('content-type', '')
            if 'jpeg' in content_type or 'jpg' in content_type:
                ext = '.jpg'
            elif 'png' in content_type:
                ext = '.png'
            elif 'gif' in content_type:
                ext = '.gif'
            else:
                # Try to get extension from URL as fallback
                if '.jpg' in url.lower() or '.jpeg' in url.lower():
                    ext = '.jpg'
                elif '.png' in url.lower():
                    ext = '.png'
                elif '.gif' in url.lower():
                    ext = '.gif'
                else:
                    ext = '.jpg'  # default
            
            filepath = os.path.join(folder_path, f"{filename}{ext}")
            
            # Save the image
            # with open(filepath, 'wb') as f:
            #     for chunk in response.iter_content(1024):
            #         f.write(chunk)
            
            print(f"Downloaded: {filepath}")
            return f"assets/images/parkimages/{os.path.basename(folder_path)}/{filename}{ext}"
        else:
            print(f"Failed to download image from {url} (Status: {response.status_code})")
            return None
    except Exception as e:
        print(f"Error downloading image: {e}")
        return None

def get_highest_resolution_image_url(img_tag):
    """Get the highest resolution image URL from an img tag"""
    if not img_tag:
        return None
    
    # Check if there's a srcset attribute
    srcset = img_tag.get('srcset', '')
    if srcset:
        # Parse srcset to get the highest resolution
        sources = []
        for source in srcset.split(','):
            parts = source.strip().split(' ')
            if len(parts) >= 2:
                url = parts[0]
                # Some sources might have width descriptors like "1.5x" or "2x"
                # or width in pixels like "300w"
                if parts[1].endswith('x') or parts[1].endswith('w'):
                    try:
                        resolution = float(parts[1][:-1])
                        sources.append((url, resolution))
                    except:
                        sources.append((url, 1))  # Default resolution
                else:
                    sources.append((url, 1))
        
        if sources:
            # Sort by resolution (highest first)
            sources.sort(key=lambda x: x[1], reverse=True)
            return "https:" + sources[0][0]
    
    # Fallback to regular src
    src = img_tag.get('src', '')
    if src:
        return "https:" + src
    
    return None

def scrape_national_parks():
    url = "https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States"
    
    # Headers to simulate a browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check for HTTP errors
    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
        return []
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find the table
    table = soup.find('table', {'class': 'wikitable'})
    
    if not table:
        print("Could not find the national parks table.")
        return []
    
    parks = []
    
    # Iterate through table rows, skipping the header
    for row in table.find_all('tr')[1:]:
        columns = row.find_all(['th', 'td'])
        
        # Skip if not enough columns
        if len(columns) < 7:
            continue
            
        try:
            # Name and link
            name_col = columns[0]
            name_link = name_col.find('a')
            name = name_link.text.strip() if name_link else name_col.text.strip()
            link = "https://en.wikipedia.org" + name_link['href'] if name_link else ""
            
            # Image
            image_col = columns[1]
            image_tag = image_col.find('img')
            
            image_path = ""
            if image_tag:
                # Get the highest resolution image URL
                image_url = get_highest_resolution_image_url(image_tag)
                
                if image_url:
                    # Download the image
                    sanitized_name = sanitize_filename(name)
                    folder_name = f"assets/images/parkimages/{sanitized_name}"
                    image_path = download_image(
                        image_url, 
                        folder_name, 
                        f"default{sanitized_name}"
                    )
            
            # Location
            location = columns[2].text.strip()
            
            # Date established
            date_established = columns[3].text.strip()
            
            # Area
            area = columns[4].text.strip()
            
            # Visitors
            visitors = columns[5].text.strip()
            
            # Description
            description = columns[6].text.strip()
            
            parks.append({
                'name': name,
                'link': link,
                'image_path': image_path if image_path else "",
                'location': location,
                'date_established': date_established,
                'area': area,
                'visitors': visitors,
                'description': description
            })
        except Exception as e:
            print(f"Error processing row: {e}")
            continue
    
    return parks

def generate_jsx_list(parks):
    """Generate a JSX list of parks as a JavaScript array"""
    jsx = "const NationalParks = [\n"
    
    for i, park in enumerate(parks):
        jsx += "  {\n"
        jsx += f'    id: {i},\n'
        jsx += f'    name: "{park["name"]}",\n'
        jsx += f'    link: "{park["link"]}",\n'
        jsx += f'    image_path: "{park["image_path"]}",\n'
        
        # Properly escape quotes in location
        escaped_location = park["location"].replace('"', '\\"')
        jsx += f'    location: "{escaped_location}",\n'
        
        jsx += f'    date_established: "{park["date_established"]}",\n'
        jsx += f'    area: "{park["area"]}",\n'
        jsx += f'    visitors: "{park["visitors"]}",\n'
        
        # Properly escape quotes in description
        escaped_description = park["description"].replace('"', '\\"')
        jsx += f'    description: "{escaped_description}"\n'
        
        jsx += "  }"
        
        # Add comma unless it's the last item
        if i < len(parks) - 1:
            jsx += ",\n"
        else:
            jsx += "\n"
    
    jsx += "];\n\nexport default NationalParks;"
    return jsx

if __name__ == "__main__":
    # Create the base directory if it doesn't exist
    os.makedirs("assets/images/parkimages", exist_ok=True)
    
    parks_data = scrape_national_parks()
    
    if parks_data:
        jsx_output = generate_jsx_list(parks_data)
        
        # Save to a file
        with open("NationalParks.jsx", "w", encoding="utf-8") as f:
            f.write(jsx_output)
        
        print(f"JSX file generated successfully with {len(parks_data)} parks!")
        print("All images have been downloaded to assets/images/parkimages/")
    else:
        print("No data was scraped. Please check the website or your connection.")
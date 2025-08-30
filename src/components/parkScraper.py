#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import json

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
            image_url = "https:" + image_tag['src'] if image_tag else ""
            
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
                'image_url': image_url,
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
        jsx += f'    image_url: "{park["image_url"]}",\n'
        
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
    parks_data = scrape_national_parks()
    
    if parks_data:
        jsx_output = generate_jsx_list(parks_data)
        
        # Save to a file
        with open("NationalParks.js", "w", encoding="utf-8") as f:
            f.write(jsx_output)
        
        print(f"JSX file generated successfully with {len(parks_data)} parks!")
    else:
        print("No data was scraped. Please check the website or your connection.")
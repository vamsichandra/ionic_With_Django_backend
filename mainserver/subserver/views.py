from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import requests
from bs4 import BeautifulSoup
import re

@require_http_methods(["GET"])
def get_legislative_data(request):
    # URL of the webpage containing the data
    url = 'https://www.ndlegis.gov/legislative-council'

    # Send an HTTP GET request and get the content
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Initialize a list to store the extracted data
        data_list = []

        # Find all elements with class "flexbox-item member-photo"
        member_photos = soup.find_all('div', class_='flexbox-item member-photo')

        # Loop through each member photo element
        for member_photo in member_photos:
            # Extract the image src
            img_src = member_photo.find('img')['src']

            # Find the closest h4 element with class "name-strong"
            name_strong = member_photo.find_next('h4', class_='name-strong')

            # Extract the text from the h4 element
            name_value = name_strong.text.strip()

            # Find the closest div element with class "work-title"
            work_title = name_strong.find_next('div', class_='work-title')

            # Extract the text from the div element
            work_title_value = work_title.text.strip()

            # Find the closest a element with a mailto link
            mailto_link = work_title.find_next('a', href=re.compile(r'^mailto:'))

            # Extract the email address and truncate it
            email_value = mailto_link['href'][7:]  # Remove "mailto:"

            # Create a dictionary for the extracted data
            member_data = {
                'img_src': "https://www.ndlegis.gov"+img_src,
                'name_value': name_value,
                'work_title_value': work_title_value,
                'email_value': email_value
            }

            # Append the dictionary to the data list
            data_list.append(member_data)

        # Return the extracted data as JSON response
        return JsonResponse({'data': data_list})

    else:
        return JsonResponse({'error': 'Failed to retrieve the webpage.'})

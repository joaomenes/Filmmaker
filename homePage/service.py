import requests
import os
from dotenv import load_dotenv

load_dotenv() 

api_key = os.getenv("API_KEY")  

url = "https://streaming-availability.p.rapidapi.com/shows/%7Btype%7D/%7Bid%7D"

headers = {
    "x-rapidapi-key": api_key,  
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

print(response.json())
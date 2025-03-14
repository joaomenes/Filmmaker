import os
import requests
import json

API_KEY = os.getenv("API_KEY") 
BASE_URL = "https://streaming-availability.p.rapidapi.com/shows/search/filters"

HEADERS = {
    "x-rapidapi-key": API_KEY, 
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com"
}

def buscar_shows(filtros):
    """filtros da busca de  filmes e séries."""

    params = {
        "country": "br",  
        "services": filtros.get("services", ""),  
        "show_type": filtros.get("show_type", ""),  
        "year_min": filtros.get("release_from", ""),  
        "year_max": filtros.get("release_to", ""),  
        "genres": filtros.get("genres", ""),  
        "language": filtros.get("language", ""),
        "imdb_rating_min": filtros.get("vote_min", ""),  
        "imdb_vote_count_min": "1000"  
    }

    response = requests.get(BASE_URL, headers=HEADERS, params=params)
    response.raise_for_status()
    return response.json() 

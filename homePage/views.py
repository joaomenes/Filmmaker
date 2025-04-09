import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import requests


def index(request):
    current_year = datetime.now().year
    year_range = range(1975, current_year + 1)
    return render(request, 'homePage/index.html', {'year_range': year_range})


@csrf_exempt
def filter_search(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            resultados = search_movies_or_series(data)
            return JsonResponse(resultados)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método não permitido"}, status=405)


def search_movies_or_series(data):
    api_key = 'API_KEY' 
    show_types = data.get('show_type', [])  # lista: ['movie', 'series']
    selected_year = data.get('year')
    genre = data.get('genre')
    query = data.get('query', '')

    resultados = []

    for show_type in show_types:
        if show_type == 'movie':
            endpoint = 'https://api.themoviedb.org/3/search/movie'
        elif show_type == 'series':
            endpoint = 'https://api.themoviedb.org/3/search/tv'
        else:
            continue  # ignora tipos inválidos

        params = {
            'api_key': api_key,
            'language': 'pt-BR',
            'query': query,
        }

        if selected_year:
            if show_type == 'movie':
                params['primary_release_year'] = selected_year
            else:
                params['first_air_date_year'] = selected_year

        response = requests.get(endpoint, params=params)
        if response.status_code == 200:
            results = response.json().get('results', [])

            for item in results:
                # Filtro de gênero 
                if genre:
                    genre_ids = item.get('genre_ids', [])
                    if int(genre) not in genre_ids:
                        continue

                resultados.append({
                    'title': item.get('title') or item.get('name'),
                    'overview': item.get('overview'),
                    'poster_path': f"https://image.tmdb.org/t/p/w500{item.get('poster_path')}" if item.get('poster_path') else None,
                    'release_date': item.get('release_date') or item.get('first_air_date'),
                    'media_type': show_type
                })

    return {'results': resultados}

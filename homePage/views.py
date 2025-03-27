import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt  
from homePage.service import search_movies_or_series  
from datetime import datetime

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


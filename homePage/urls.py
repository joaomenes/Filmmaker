from django.urls import path
from homePage.views import index, filter_search  


urlpatterns = [
    path('', index, name='index'),  
    path('filter/', filter_search, name='filter'),  
    ]

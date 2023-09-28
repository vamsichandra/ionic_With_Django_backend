from django.urls import path
from . import views

urlpatterns = [
    path('get-legislative-data/', views.get_legislative_data, name='get_legislative_data'),
]

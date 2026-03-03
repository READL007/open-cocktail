from django.urls import path
from . import views

urlpatterns = [
    path('', views.cocktail_list, name='cocktail_list'),
    path('<int:cocktail_id>/', views.cocktail_detail, name='cocktail_detail'),
    path('create/', views.create_cocktail, name='create_cocktail'),
]


from django.contrib import admin
from .models import Cocktail

@admin.register(Cocktail)
class CocktailAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'preparation_time', 'difficulty')


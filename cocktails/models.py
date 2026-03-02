from django.db import models
from django import forms

# Cocktail model with name, category, preparation time, ingredients, steps, number of servings, difficulty, ustensils
class Cocktail(models.Model):
    TYPE_CHOICES = [
        ('dry', 'Dry'),
        ('sugary', 'Sugary'),
        ('alcohol_free', 'Alcohol free'),
    ]

    DIFFICULTY = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    name = models.CharField(max_length=255)
    category =  models.CharField(max_length=20, choices=TYPE_CHOICES)
    preparation_time = models.IntegerField()
    ingredients = models.TextField()
    steps = models.TextField()
    servings = models.IntegerField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY)
    ustensils = models.TextField()

    def __str__(self):
        return self.name


class CocktailForm(forms.ModelForm):
    class Meta:
        model = Cocktail
        fields = [
            'name', 'category', 'preparation_time', 'ingredients',
            'steps', 'servings', 'difficulty', 'ustensils'
        ]

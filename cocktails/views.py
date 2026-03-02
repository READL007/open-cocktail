from django.shortcuts import render

# List all cocktails
def cocktail_list(request):
    return render(request, 'cocktails/cocktail_list.html')

# View cocktail details
def cocktail_detail(request, cocktail_id):
    return render(request, 'cocktails/cocktail_detail.html', {'cocktail_id': cocktail_id})
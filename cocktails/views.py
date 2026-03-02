from django.shortcuts import render, redirect

from cocktails.models import Cocktail, CocktailForm
from django.shortcuts import get_object_or_404

# List all cocktails
def cocktail_list(request):
    cocktails = Cocktail.objects.all()
    return render(request, 'cocktail_list.html', {'cocktails': cocktails})

# View cocktail details
def cocktail_detail(request, cocktail_id):
    cocktail = get_object_or_404(Cocktail, pk=cocktail_id)
    return render(request, 'cocktail_detail.html', {'cocktail': cocktail})

def create_cocktail(request):
    if request.method == 'POST':
        form = CocktailForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('cocktail_list')
    else:
        form = CocktailForm()

    return render(request, 'create_cocktail.html', {'form': form})

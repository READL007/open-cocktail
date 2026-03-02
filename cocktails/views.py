from django.shortcuts import render, redirect, get_object_or_404
from cocktails.models import Cocktail, CocktailForm
from django.db.models import Q

# List cocktails with search functionality
def cocktail_list(request):
    query = request.GET.get("q", "")
    cocktails = Cocktail.objects.all()

    if query:
        cocktails = cocktails.filter(
            Q(name__icontains=query) |
            Q(category__icontains=query)
        )

    return render(request, "cocktail_list.html", {"cocktails": cocktails, "query": query})

# View cocktail details
def cocktail_detail(request, cocktail_id):
    cocktail = get_object_or_404(Cocktail, pk=cocktail_id)
    return render(request, 'cocktail_detail.html', {'cocktail': cocktail})

# Create a new cocktail
def create_cocktail(request):
    if request.method == 'POST':
        form = CocktailForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('cocktail_list')
    else:
        form = CocktailForm()

    return render(request, 'create_cocktail.html', {'form': form})

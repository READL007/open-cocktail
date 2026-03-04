import requests
from django.shortcuts import render, redirect
from django.conf import settings
from cocktails.models import CocktailForm

API_URL = settings.EXPRESS_API_URL

# List cocktails with search functionality
def cocktail_list(request):
    query = request.GET.get("q", "")
    try:
        response = requests.get(f"{API_URL}/cocktails")
        response.raise_for_status()
        cocktails = response.json()
    except requests.RequestException as e:
        cocktails = []
        print(f"API error: {e}")

    # Filter client-side (mirrors your Q filter on name + category)
    if query:
        q = query.lower()
        cocktails = [
            c for c in cocktails
            if q in c.get("name", "").lower() or q in c.get("category", "").lower()
        ]

    return render(request, "cocktail_list.html", {"cocktails": cocktails, "query": query})


# View cocktail details
def cocktail_detail(request, cocktail_id):
    try:
        response = requests.get(f"{API_URL}/cocktails/{cocktail_id}")
        if response.status_code == 404:
            from django.http import Http404
            raise Http404("Cocktail not found")
        response.raise_for_status()
        cocktail = response.json()
    except requests.RequestException as e:
        from django.http import Http404
        raise Http404(f"API error: {e}")

    return render(request, "cocktail_detail.html", {"cocktail": cocktail})


# Create a new cocktail
def create_cocktail(request):
    if request.method == "POST":
        form = CocktailForm(request.POST, request.FILES)
        if form.is_valid():
            data = form.cleaned_data
            files = {}

            # Handle image upload
            if "image" in request.FILES:
                image = request.FILES["image"]
                files["image"] = (image.name, image.read(), image.content_type)

            payload = {k: v for k, v in data.items() if k != "image"}

            try:
                response = requests.post(
                    f"{API_URL}/cocktails",
                    data=payload,
                    files=files if files else None,
                )
                response.raise_for_status()
                return redirect("cocktail_list")
            except requests.RequestException as e:
                form.add_error(None, f"Could not save cocktail: {e}")
    else:
        form = CocktailForm()

    return render(request, "create_cocktail.html", {"form": form})
# open-cocktail
## Context
Django application for cocktail recipes.
Users can browse through reciepes and create new ones. They can vote or rate others reciepes. They also can add comments.

Every cocktail have a type, it can be:
- dry
- sugary
- alcohol free

## Features
### V.1.0.0
- View the list of available recipes (title, category, preparation time, image).
- See the details of a recipe (ingredients, steps, number of servings, difficulty, utensils).
- Search for recipes by name or category.

## Run app
### FRONT
```
cd django
```

Activate python env
```
python3 -m venv djangoEnv
source djangoEnv/bin/activate
```

Run migrations
```
python manage.py migrate
```


Start server
```
python manage.py runserver
```

Visit http://127.0.0.1:8000 

### BACK
```
cd express
```

Run server and seeder
```
npm run serve
npm run seed
```
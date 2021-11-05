# Serveless COOKPAD:

## About the project:

This capstone project is implamented using AWS Lambda and Serverless framework. it consist of a simple application managing a mini cookbook notes.

## Build with:

### Backend :
- Nodejs 14
- AWS lambda
- Serveless

### Client:

- Angular 12
- Bootswatch
- Auth0

### Functionality of the application:

this application will allow creating/updating/fetching and deleting recipe items. each item can have image showing the prepared dish. Each user have acces to all his recipes and can evantually share some of them as public recipes.

### RECIPE Item:
- recipeId: string (a unique ID)
- name: string (name of a recipe)
- ingredients: string (ingredients needed to prepare a recipe)
- preparation: string (preparation and cooking steps)
- prepationTime: string
- cookingTime: string
- attachmentUrl: string (optional) - (a URL pointing to an image attached to a recipe item)
- category: string ( a category class sach as : Bread, Cakes...etc)
- private : boolean ( true if note shared and false if shared with other users)
Each recipe item is attached to a userId

### Functions implemented:
1 - Auth:
2 - createRecipe
3 - getRecipes
4 - updateRecipe:
5 - deleteRecipe:
6 - GenerateUploadUrl:
7 - publishRecipe:
8 - getPublishedRecipes:

### Run Frontend app:

```
cd frontend
npm install
npm start
```

### Usage:
- To diplay all user recipe click on -My recipes- menu once authenticated
- to create a new recipe click on -create- button
- For each recipe item:  
    - you can upload a file by clicking on pencil icon
    - update a recipe by clicking on edit icon 
    - delete a recipe by clicking on delete icon
    - show recipe details by clicking on recipe name (Title)
                         




 


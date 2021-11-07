# Serveless COOKPAD:

## About the project:

This capstone project is implamented using AWS Lambda and Serverless framework. it consists of a simple application managing a mini cookbook notes.

## Built with:

### Backend :
- Nodejs 14
- AWS lambda
- Serveless framework

### Client:

- Angular 12
- Bootswatch
- Auth0

### Functionality of the application:

This application will allow creating, updating, fetching and deleting recipe items. Each item can have an image showing the prepared dish. Each user has acces to all his recipes and can evantually share some of them as public recipes.

### RECIPE Item:
- **recipeId**: string (a unique ID)
- **name**: string (name of a recipe)
- **ingredients**: string (ingredients needed to prepare a recipe)
- **preparation**: string (preparation and cooking steps)
- **prepationTime**: string (Time in minutes needed to prepare a recipe)
- **cookingTime**: string (cooking time in minites)
- **attachmentUrl**: string (optional) - (a URL pointing to an image attached to a recipe item)
- **category**: string ( a category class sach as : Bread, Cakes...etc)
- **private** : number ( 1 if not shared and 0 if shared with other users)

Each recipe item is attached to a userId

### Functions implemented:
1. **Auth**: this function implements a custom authorizer for API Gateway which is added to all other functions (except getPublishedRecipes function).
2. **createRecipe**: Creates a new recipe for the current user and returns a new recipe item
3. **getRecipes**: this function returns all recipes created by the current user
4. **updateRecipe**: Updates a recipe item created by the current user
5. **deleteRecipe**: Deletes a recipe item created by the current user
6. **GenerateUploadUrl**: returns a pre-signed URL that can be used to upload an attachment file for a recipe item.
7. **publishRecipe**: allows to share a recipe by updating the **private** proerty to 0
8. **getPublishedRecipes**: this function returns all recipes shared by all users having property **private** equal to 0

### Run Frontend app:

```
cd frontend
npm install
npm start
```

### Usage:
- To diplay all user recipes click on **My recipes** menu once authenticated
- To create a new recipe click on **new recipe** button
- For each recipe item, you can: 
  - Upload a file (image) by clicking on *pencil* icon
  - Update a recipe by clicking on *edit* icon 
  - Delete a recipe by clicking on *delete* icon
  - Show recipe details by clicking on recipe name (Title)
  - Share a recipe by clicking on *share* icon
                         




 


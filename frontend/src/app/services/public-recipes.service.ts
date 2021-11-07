import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeItem } from '../models/recipeItem';
import { environment as env} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface PublicListResponse {
  item: RecipeItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PublicRecipesService {

  recipes: RecipeItem[] = [];
  recipesSubject = new BehaviorSubject<RecipeItem[]>([]);
  apiURL=env.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.getSharedRecipes();
  }

  emitRecipes() {
    this.recipesSubject.next(this.recipes);
    console.log("++++ public recipes : "+this.recipes);
  }

  getSharedRecipes(){
    this.httpClient
    .get<PublicListResponse>(this.apiURL + '/recipes/public')
    .subscribe(
      (response) => {
        this.recipes= response.item;
        this.emitRecipes();
      },
      (error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      });
  }

  getRecipe(id: string):RecipeItem|undefined{

    const obj= this.recipes.find(
       recipe => {
         if (recipe.recipeId===id){
         return recipe.recipeId;
         }
         else return undefined;
       });
       console.log('Public object is '+obj?.name);
       return obj;

 }
}

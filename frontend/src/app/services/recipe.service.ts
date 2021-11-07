import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreateRecipeRequest } from '../models/createRecipeRequest';
import { RecipeItem } from '../models/recipeItem';
import { UrlResponse } from '../models/urlResponse';
import { UpdateRecipeRequest } from '../models/updateRecipeRequest';
import { AuthService } from './auth.service';
import { BehaviorSubject, defer } from 'rxjs';
import { environment as env} from '../../environments/environment';
import { RecipesListResponse } from '../models/recipesListResponse';


export interface RecipeItemResponse {
  item: RecipeItem;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiURL = env.apiUrl;

  recipes: RecipeItem[] = [];
  recipesSubject = new BehaviorSubject<RecipeItem[]>([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
      this.getRecipes();
  }

  emitRecipes() {
    this.recipesSubject.next(this.recipes);
  }

  addRecipeToArray(recipeItem: RecipeItem){
   this.recipes.push(recipeItem);
   this.emitRecipes();
  }


  getRecipes(){
    console.log("Getting recipes");
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.idToken}`)
    }
    this.httpClient
    .get<RecipesListResponse>(this.apiURL + '/recipes', header)
    .subscribe(
      (response) => {
        this.recipes= response.items;
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
        console.log('object is '+obj?.name);
        return obj;

  }

  getUploadUrl(id:number):Observable<UrlResponse>{
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.idToken}`)
    }
   return this.httpClient.post<UrlResponse>(this.apiURL +"/recipes/"+ id+'/attachment',{}, header);
  }

  uploadFile(uploadUrl: string, file:File){
    this.httpClient.put(uploadUrl, file).subscribe(
      () => {
        console.log('File uploaded !');
        this.getRecipes();
      },
      (error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
    );

  }

  createRecipe(newRecipe: CreateRecipeRequest):Observable<RecipeItemResponse>{

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.idToken}`)
    }
    return this.httpClient.post<RecipeItemResponse>(this.apiURL +"/recipes",newRecipe, header);
  }

  deleteRecipe(id: string){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.idToken}`)
    }
   this.httpClient.delete(this.apiURL+"/recipes/"+id, header).subscribe(
    () => {
      console.log('Recipe deleted !');
      const index=this.recipes.findIndex(recipe=>recipe.recipeId===id);
      this.recipes.splice(index,1);
      this.emitRecipes();
    },
    (error) => {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
   );
  }

  updateRecipe(id: string, updateRecipe: UpdateRecipeRequest){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.idToken}`)
    }
    this.httpClient.patch(this.apiURL+"/recipes/"+id, updateRecipe, header).subscribe(
      () => {
        const index=this.recipes.findIndex(recipe=>recipe.recipeId===id);
        this.recipes[index].preparationTime=updateRecipe.preparationTime;
        this.recipes[index].cookingTime=updateRecipe.cookingTime;
        console.log('Recipe updated !');
        this.emitRecipes();
      },
      (error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
    );
  }

  shareRecipe(id: string){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.idToken}`)
    }
    this.httpClient.patch(this.apiURL+"/recipes/"+id+"/public", {}, header).subscribe(
      () => {
        const index=this.recipes.findIndex(recipe=>recipe.recipeId===id);
        this.recipes[index].private=0;
        console.log('Recipe shared!');
        this.emitRecipes();
      },
      (error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
    );
  }

}

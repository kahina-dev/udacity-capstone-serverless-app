import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { CreateRecipeRequest } from '../models/createRecipeRequest';
import { RecipeItem } from '../models/recipeItem';
import { UrlResponse } from '../models/urlResponse';
import { UpdateRecipeRequest } from '../models/updateRecipeRequest';
import { ReplaySubject } from 'rxjs-compat';
import { AuthService } from './auth.service';
import { BehaviorSubject, defer } from 'rxjs';
import { retry } from 'rxjs/operators';

export interface RecipesListResponse {
  items: RecipeItem[];
}


export interface RecipeItemResponse {
  item: RecipeItem;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiURL = 'https://74jp05bxbe.execute-api.us-east-1.amazonaws.com/dev';

  recipes: RecipeItem[] = [];
  recipesSubject = new BehaviorSubject<RecipeItem[]>([]); // new Subject<RecipeItem[]>();

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    console.log("service constructor")
    this.getRecipes();
  }

  emitRecipes() {
    this.recipesSubject.next(this.recipes);
    console.log("++++"+this.recipes);
  }

  addRecipeToArray(recipeItem: RecipeItem){
   this.recipes.push(recipeItem);
   this.emitRecipes();
  }


  getRecipes(){
    console.log("++++ Getting recipes");
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
}

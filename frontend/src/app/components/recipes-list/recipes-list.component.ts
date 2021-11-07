import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RecipeItem } from 'src/app/models/recipeItem';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: RecipeItem[] = [];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {
   }


  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe(
      (recipes: RecipeItem[]) => {
        this.recipes = recipes;
        this.recipeService.emitRecipes;
      },
      (error) => {
        console.error(
          `${error.status}, error is: `, error.error);
      }
    );



  }



  onNewRecipe(){
this.router.navigate(['recipes', 'new']);
  }

  onUploadImg(id: string){
    this.router.navigate(['/recipes', id, 'image']);
      }

  onUpdateRecipe(id: string){
    this.router.navigate(['/recipes', 'update', id]);
  }

  onDeleteRecipe(id: string){
    this.recipeService.deleteRecipe(id);
  }

  onSingleRecipe(id:String){
    this.router.navigate(['/recipes', 'view', id]);
  }

  onShareRecipe(id: string){
    this.recipeService.shareRecipe(id);
  }

  ngOnDestroy(): void {

  this.recipesSubscription.unsubscribe();
  }
}

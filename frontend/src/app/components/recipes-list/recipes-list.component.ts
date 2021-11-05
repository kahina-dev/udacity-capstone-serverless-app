import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RecipeItem } from 'src/app/models/recipeItem';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from '../../services/auth.service';

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
    console.log("--- init recipe list");
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe(
      (recipes: RecipeItem[]) => {
        this.recipes = recipes;
        console.log("Subscription");
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

  ngOnDestroy(): void {

  this.recipesSubscription.unsubscribe();
  }
}

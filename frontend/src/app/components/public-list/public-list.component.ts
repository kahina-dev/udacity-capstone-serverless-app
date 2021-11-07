import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RecipeItem } from 'src/app/models/recipeItem';
import { PublicRecipesService } from 'src/app/services/public-recipes.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-public-list',
  templateUrl: './public-list.component.html',
  styleUrls: ['./public-list.component.scss']
})
export class PublicListComponent implements OnInit {

  recipes: RecipeItem[] = [];
  publicRecipesSubscription: Subscription;

  constructor(private router: Router, private recipeService: PublicRecipesService, public authService :AuthService) {
   }


  ngOnInit(): void {
   this.publicRecipesSubscription = this.recipeService.recipesSubject.subscribe(
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

}

import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { RecipeItem } from '../../models/recipeItem';
import { RecipeService } from '../../services/recipe.service';
import {ActivatedRoute, Router } from '@angular/router';
import { PublicRecipesService } from '../../services/public-recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {

   recipe:RecipeItem|undefined;

  constructor(private recipeService: RecipeService, private publicRecipesService: PublicRecipesService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const status = this.route.snapshot.params['status'];
    if (status==='private')this.recipe=this.recipeService.getRecipe(id);
    if (status==='public') this.recipe=this.publicRecipesService.getRecipe(id);
  }

}

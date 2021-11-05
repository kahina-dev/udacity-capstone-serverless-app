import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { RecipeItem } from '../../models/recipeItem';
import { RecipeService } from '../../services/recipe.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {

   recipe:RecipeItem|undefined;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    console.log("init method")
    const id = this.route.snapshot.params['id'];
    this.recipe=this.recipeService.getRecipe(id);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { CreateRecipeRequest } from 'src/app/models/createRecipeRequest';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: ['', [Validators.required, Validators.minLength(10)]],
      preparation: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required]
    });
  }

  onSaveRecipe() {

    const newRecipe: CreateRecipeRequest={
      name: this.recipeForm.get('name')?.value,
      category: this.recipeForm.get('category')?.value,
      ingredients: this.recipeForm.get('ingredients')?.value,
      preparation: this.recipeForm.get('preparation')?.value
    };
    this.recipeService.createRecipe(newRecipe).subscribe(
      (response) => {
        console.log('Recipe saved !');
        this.recipeService.addRecipeToArray(response.item);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
    );
  }

  get name() { return this.recipeForm.get('name'); }
  get category() { return this.recipeForm.get('category'); }
  get ingredients() { return this.recipeForm.get('ingredients'); }
  get preparation() { return this.recipeForm.get('preparation'); }

}

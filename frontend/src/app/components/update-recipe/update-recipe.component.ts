import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateRecipeRequest } from 'src/app/models/updateRecipeRequest';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent implements OnInit {

  updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updateForm = this.formBuilder.group({
      preparationTime: ['', [Validators.required, Validators.minLength(2)]],
      cookingTime: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onUpdateRecipe(){
    const updateRecipe: UpdateRecipeRequest={
      preparationTime: this.updateForm.get('preparationTime')?.value,
      cookingTime: this.updateForm.get('cookingTime')?.value,
  }
  const id = this.route.snapshot.params['id'];
  this.recipeService.updateRecipe(id, updateRecipe);
  this.router.navigate(['/recipes']);
}

get preparationTime() { return this.updateForm.get('preparationTime'); }

get cookingTime() { return this.updateForm.get('cookingTime'); }

}

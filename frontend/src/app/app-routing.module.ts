import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewImageComponent } from './components/new-image/new-image.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { PublicListComponent } from './components/public-list/public-list.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';
import { UpdateRecipeComponent } from './components/update-recipe/update-recipe.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'recipes', canActivate: [AuthGuardService], component: RecipesListComponent },
  { path: 'recipes/public', component: PublicListComponent },
  { path: 'recipes/new', canActivate: [AuthGuardService], component: NewRecipeComponent },
  { path: 'recipes/:id/image', canActivate: [AuthGuardService], component: NewImageComponent },
  { path: 'recipes/view/:id/:status', component: SingleRecipeComponent },
  { path: 'recipes/update/:id', canActivate: [AuthGuardService], component: UpdateRecipeComponent },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: '**', redirectTo: 'recipes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

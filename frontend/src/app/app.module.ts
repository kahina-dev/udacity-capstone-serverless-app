import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { PublicListComponent } from './components/public-list/public-list.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { NewImageComponent } from './components/new-image/new-image.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './services/recipe.service';

import { HttpClientModule } from '@angular/common/http';
import { UpdateRecipeComponent } from './components/update-recipe/update-recipe.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    PublicListComponent,
    NewRecipeComponent,
    NewImageComponent,
    SingleRecipeComponent,
    MenuComponent,
    UpdateRecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RecipeService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeBookComponent
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule, RecipesRoutingModule]
})
export class RecipesModule{}
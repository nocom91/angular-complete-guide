import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeBookComponent } from './recipe-book.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { RecipesResolverService } from './recipes-resolver.service';

const recipesRoutes: Routes = [
    {
        path: '',
        component: RecipeBookComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent, canActivate: [] },
            { path: ':id', component: RecipeDetailComponent,resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [],resolve: [RecipesResolverService] },
        ]
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
  providers: [
  ]
})
export class RecipesRoutingModule { }

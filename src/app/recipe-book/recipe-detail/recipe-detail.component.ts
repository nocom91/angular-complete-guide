import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as recipesActions from '../store/recipe.actions';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';

import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    this.route.params.pipe(
      map((params: Params) => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes')
      }),
      map(recipesState => recipesState.recipes.find((recipes, index) => {
        return index === this.id;
      }))
    )
    .subscribe(recipe =>
      this.recipe = recipe
    );
  }

  ngOnInit() {
  }

  addToShoppingList() {
    this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe(){
    this.store.dispatch(new recipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import * as ShopppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from './../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
 recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      0,
      'A test recipe 1 ',
      'Test',
      'https://www.bbcgoodfood.com/sites/default' +
      '/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [
      new Ingredient('Cheese', 1),
      new Ingredient('Cucumber', 2)
    ]),
    new Recipe(
      1,
      'A test recipe 2',
      'Test',
      'https://www.bbcgoodfood.com/sites/default/files' +
      '/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [
      new Ingredient('Tomatos', 3),
      new Ingredient('Ham', 1)
    ])
  ];

  constructor(
    private store: Store<fromShoppingList.AppState>) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShopppingListActions.AddIngredients(ingredients));
  }

  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Recipe){
    var index = this.recipes.length;
    recipe.id = index;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    let oldrecipe =  this.recipes[index];
    newRecipe.id = oldrecipe.id;
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipeById(id: number) {
    this.recipes = this.recipes.filter(x=>x.id!=id);
    this.recipesChanged.next(this.recipes.slice());
  }
}

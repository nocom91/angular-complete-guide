import { Recipe } from '../shared/models/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();
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

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === id);
  }
}

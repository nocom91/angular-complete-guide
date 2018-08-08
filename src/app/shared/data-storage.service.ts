import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../recipe-book/recipe.service';

import { Recipe } from './models/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
    private _recipeService: RecipeService) { }

  storeRecipes() {

    const recipes = this._recipeService.getRecipes();

    return this.http.put('https://ng-recipe-book-36792.firebaseio.com/recipes.json', recipes);

  }

  fetchRecipes() {
    return this.http.get('https://ng-recipe-book-36792.firebaseio.com/recipes.json')
    .map((response: Response) => {
      const recipes: Recipe[] = response.json();

      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
        return recipes;
      }
    })
    .subscribe((recipes: Recipe[]) => {
      this._recipeService.setRecipes(recipes);
    });
  }
}

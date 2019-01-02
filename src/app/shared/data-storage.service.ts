
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipe-book/recipe.service';
import { AuthService } from '../auth/auth.service';

import { Recipe } from './models/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
    private _recipeService: RecipeService,
    private auth: AuthService) { }

  storeRecipes() {
    const recipes = this._recipeService.getRecipes();
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-36792.firebaseio.com/recipes.json', recipes,
      {
        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-36792.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
      map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;


      }))
      .subscribe((recipes: Recipe[]) => {
        this._recipeService.setRecipes(recipes);
      });
  }
}

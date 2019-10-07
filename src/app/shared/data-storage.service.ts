
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipe-book/recipe.service';
import { AuthService } from '../auth/auth.service';

import { Recipe } from './models/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private httpClient: HttpClient,
    private _recipeService: RecipeService,
    private auth: AuthService) { }

  storeRecipes() {
    const recipes = this._recipeService.getRecipes();
    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-36792.firebaseio.com/recipes.json', recipes,
    //   {
    //     reportProgress: true
    //   });

    // return this.httpClient.request(req);
    this.httpClient.put('https://ng-recipe-book-36792.firebaseio.com/recipes.json', recipes)
    .subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-36792.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients: []
          };
          });
        }),
        tap(recipes => {
          this._recipeService.setRecipes(recipes);
        }));
  }
}

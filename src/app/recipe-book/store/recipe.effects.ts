import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as recipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../../shared/models/recipe.model';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(recipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-36792.firebaseio.com/recipes.json').pipe(
                map((recipes) => {
                    if (!recipes) return [];
                    return recipes.map((recipe) => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                map(recipes => {
                    return new recipeActions.SetRecipes(recipes);
                })
            )
        })
    );

    @Effect({dispatch: false})
    storeRecipe = this.actions$.pipe(
        ofType(recipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actiondData, recipesState]) => {
            return this.httpClient.put('https://ng-recipe-book-36792.firebaseio.com/recipes.json', 
            recipesState.recipes);
        })
    )

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>) {}
}
import { Recipe } from "../../shared/models/recipe.model";
import * as recipesActions from './recipe.actions';

export interface State {
    recipes:  Recipe[]
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state : State = initialState, action: recipesActions.RecipesAction) {
    switch(action.type) {
        case recipesActions.SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            };
        }

        case recipesActions.ADD_RECIPE: {
            var index = state.recipes.length;
            const newRecipe = {
                ...action.payload,
                id: index
            };
            return {
                ...state,
                recipes : [...state.recipes, newRecipe]
            };
        };

        case recipesActions.UPDATE_RECIPE: {
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: updatedRecipes
            };
        }

        case recipesActions.DELETE_RECIPE: {
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload
                })
            };
        }
        default: return state;
    }
}
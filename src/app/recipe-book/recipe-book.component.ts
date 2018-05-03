import { Component, OnInit} from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: [RecipeService]
})
export class RecipeBookComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) {
    this.selectedRecipe = null;
  }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  public openDetailed(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input()
  recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}

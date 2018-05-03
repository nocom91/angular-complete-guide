import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../recipe.service';
@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input()
  recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}

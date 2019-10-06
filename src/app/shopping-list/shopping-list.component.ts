import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{
    ingredients: Ingredient[]
  }>;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{
      shoppingList: {
        ingredients: Ingredient[]
      }
    }>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredient.model';

import * as shoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

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
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    
  }
  onEditItem(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
  }
}

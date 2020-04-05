//import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as authActions from '../../auth/store/auth.actions';
import * as recipesActions from '../../recipe-book/store/recipe.actions';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(state=> state.user)
    )
    .subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  public saveDataToDatabase() {
    this.store.dispatch(new recipesActions.StoreRecipes());
  }

  public fetchDataFromDatabase() {
    this.store.dispatch(new recipesActions.FetchRecipes());
  }

  onLogout() {    
    this.store.dispatch(new authActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

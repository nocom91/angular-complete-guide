import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import * as fromApp from './store/app.reducer';
import * as authActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Recipe Book';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyArbEqi6C27HBZJuZ9F6CKfsbvQdiWi3zA',
      authDomain: 'ng-recipe-book-36792.firebaseapp.com'
    });
    this.store.dispatch(new authActions.AutoLogin());
  }
}

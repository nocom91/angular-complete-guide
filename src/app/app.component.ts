import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Recipe Book';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyArbEqi6C27HBZJuZ9F6CKfsbvQdiWi3zA',
      authDomain: 'ng-recipe-book-36792.firebaseapp.com'
    });
    this.authService.autoLogin();
  }
}

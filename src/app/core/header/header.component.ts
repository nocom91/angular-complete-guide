//import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as authActions from '../../auth/store/auth.actions';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private dataServerService: DataStorageService,
              public authService: AuthService,
              private store: Store<fromApp.AppState>) {
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
    this.dataServerService.storeRecipes();
  }

  public fetchDataFromDatabase() {
    this.dataServerService.fetchRecipes().subscribe();
  }

  onLogout() {    
    this.store.dispatch(new authActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

//import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private dataServerService: DataStorageService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.userSubject.subscribe(user => {
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
    //this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

//import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth_old/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataServerService: DataStorageService,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

  public saveDataToDatabase() {
    this.dataServerService.storeRecipes();
  }

  public fetchDataFromDatabase() {
    this.dataServerService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}

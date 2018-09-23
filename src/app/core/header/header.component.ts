import { Response } from '@angular/http';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

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
    this.dataServerService.storeRecipes()
      .subscribe((data: Response) => console.log(data));
  }

  public fetchDataFromDatabase() {
    this.dataServerService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}

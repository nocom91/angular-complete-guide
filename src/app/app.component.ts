import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedComponent: string;

  constructor() {
    this.selectedComponent = 'recipes';
  }
  public toggleComponents(selected: string) {
    this.selectedComponent = selected;
  }
}

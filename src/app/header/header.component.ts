import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  componentSelected: EventEmitter<string>;
  constructor() {
    this.componentSelected = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  public open(comp: string) {
    this.componentSelected.emit(comp);
  }

}

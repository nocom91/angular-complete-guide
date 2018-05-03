import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')
  private isOpen = false;
  constructor() { }

  @HostListener('click')
  onClick() {
    this.isOpen = !this.isOpen;
  }
}

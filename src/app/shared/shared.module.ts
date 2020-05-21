import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  imports:[CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule{}

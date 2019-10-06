import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ShoppingListComponent } from './shopping-list.component';
import { EditShoppingListComponent } from './edit-shopping-list/edit-shopping-list.component';


@NgModule({
  declarations: [
    ShoppingListComponent,
    EditShoppingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShoppingListModule{}

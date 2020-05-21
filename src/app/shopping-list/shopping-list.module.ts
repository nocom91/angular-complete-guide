import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { EditShoppingListComponent } from './edit-shopping-list/edit-shopping-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    EditShoppingListComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: ShoppingListComponent
    }])
  ]
})
export class ShoppingListModule{}

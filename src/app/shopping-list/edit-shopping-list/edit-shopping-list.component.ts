import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css']
})
export class EditShoppingListComponent implements OnInit {
  @ViewChild('nameInput')
  public name: ElementRef;
  @ViewChild('amountInput')
  public amount: ElementRef;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
  }

  public addIngredient() {
    const newIngredient = new Ingredient(this.name.nativeElement.value, +this.amount.nativeElement.value);
    this.slService.addIngredient(newIngredient);
  }
}

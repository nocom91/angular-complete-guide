import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as recipeActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  public recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor( private route: ActivatedRoute,
  private router: Router,
  private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  public onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new recipeActions.UpdateRecipe({
        index: this.id,
        newRecipe: this.recipeForm.value
      }))
    } else {
      this.store.dispatch(new recipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  public onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/),
      Validators.required])
    }));
  }

  public onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  public onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  public get Ingredients () {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipes, index) => {
            return index === this.id
          })
        })
      ).subscribe((recipe) => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/),
                Validators.required])
              })
            );
          }
        }
      });      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

}

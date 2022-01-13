import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: IngredientModel[] = [];

  constructor(private dataStrorageService: DataStorageService) {}

  getIngredients() {
    this.dataStrorageService.sendGetRequest('shopping-list').subscribe(
      (data) => {
        this.ingredients = data as IngredientModel[];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addIngredient(ingredient: IngredientModel) {
    let ingredientFound = false;
    for (const item of this.ingredients) {
      if (item.name.toUpperCase() == ingredient.name.toUpperCase()) {
        ingredientFound = true;
        item.amount += ingredient.amount;
        this.pacthIngredients({amout: item.amount}, item.id)
        break;
      }
    }
    if (!ingredientFound) {
      this.ingredients.push(ingredient);
      this.postIngredients(ingredient)
    }
  }

  addIngredients(ingredients: IngredientModel[]) {
    // this.ingredients.push(...ingredients);
    for (const ingredient of ingredients) {
      this.addIngredient(ingredient)
    }
  }

  postIngredients = (ingredient: IngredientModel) => {
    this.dataStrorageService
      .sendPosttRequest('shopping-list/' , ingredient)
      .subscribe(
        (succ) => console.log(succ),
        (err) => console.log(err)
      );
  };


  pacthIngredients = (data: any, id:number) => {
    this.dataStrorageService
      .sendPatchRequest('shopping-list/' + id, data)
      .subscribe(
        (succ) => console.log(succ),
        (err) => console.log(err)
      );
  }
}

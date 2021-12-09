import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe:RecipeModel

  constructor() { }

  ngOnInit(): void {
    console.log(this.recipe);
  }

}

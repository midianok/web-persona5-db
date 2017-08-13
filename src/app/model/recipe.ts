import {Persona} from "./persona";

export class Recipe {
  ingredients: Array<Persona>;
  result: Persona;

  constructor(ingredients: Array<Persona>, result: Persona){
    this.ingredients = ingredients;
    this.result = result;
  }
}

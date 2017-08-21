import {Persona} from "./persona";

export class Recipe {
  ingredients: Array<Persona>;
  result: Persona;
  price: number;
  constructor(ingredients: Array<Persona>, result: Persona, price: number){
    this.ingredients = ingredients;
    this.result = result;
    this.price = price;
  }
}

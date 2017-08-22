///<reference path="../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FusonService } from "../../../services/fuson.service";
import { PersonaService } from "../../../services/persona.service";
import { Recipe } from "../../../model/recipe";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipes-to',
  templateUrl: './recipes-to.component.html',
  styleUrls: ['../details.component.css', './recipes-to.component.css']
})
export class RecipesToComponent implements OnDestroy{
  recipesAll: Array<Recipe>;
  recipesToShow: Array<Recipe>;
  routeSubscription: Subscription;
  @ViewChild('recipiFilter') recipiFilter: ElementRef;
  constructor(
    personaService: PersonaService,
    fusonService: FusonService,
    route: ActivatedRoute,
    private router: Router) {
    this.routeSubscription = route.params.subscribe(x => {
      const personaName = x.name;
      const persona = personaService.getPersonaByName(personaName);
      this.recipesAll = fusonService.getPersonaToRecipes(persona);
      this.recipesToShow = this.recipesAll;
    });
  }

  filterByName() {
    const filter = this.recipiFilter.nativeElement.value;
    this.recipesToShow = this.recipesAll
      .filter(recipe =>
        recipe.ingredients.some(
          ingr => ingr.name.toLowerCase()
            .includes(
              filter.toLowerCase()
            )
        )
      );
  }

  goToPersonaDetails(personaName: string): void {
    this.router.navigate(['details', personaName]);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FusionService } from "../../../services/fusion.service";
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
  limit = 10;
  @ViewChild('recipiFilter') recipiFilter: ElementRef;

  constructor(
    personaService: PersonaService,
    fusonService: FusionService,
    route: ActivatedRoute,
    private router: Router) {
    this.routeSubscription = route.params.subscribe(x => {
      this.limit = 10;
      const personaName = x.name;
      const persona = personaService.getPersonaByName(personaName);
      if (persona.rare){
        this.recipesToShow = [];
      } else {
        this.recipesAll = fusonService.getPersonaToRecipes(persona);
        this.recipesToShow = this.recipesAll;
      }
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

  toggleLimit() {
    if (this.limit === 10)
      this.limit = 0;
    else
      this.limit = 10;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

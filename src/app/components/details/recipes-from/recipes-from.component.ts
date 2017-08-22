import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {Subscription} from "rxjs/Subscription";
import {PersonaService} from "../../../services/persona.service";
import {FusonService} from "../../../services/fuson.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-from',
  templateUrl: './recipes-from.component.html',
  styleUrls: ['../details.component.css', './recipes-from.component.css']
})
export class RecipesFromComponent {
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
      this.recipesToShow = this.recipesAll
        .sort(recipe => recipe.price)
        .slice(0, 10);
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
      )
      .sort(recipe => recipe.price)
      .slice(0, 10);
  }

  goToPersonaDetails(personaName: string): void {
    this.router.navigate(['details', personaName]);
  }

}

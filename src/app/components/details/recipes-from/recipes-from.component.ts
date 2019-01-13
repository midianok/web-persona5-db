import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Recipe} from "../../../model/recipe";
import {Subscription} from "rxjs/Subscription";
import {PersonaService} from "../../../services/persona.service";
import {FusionService} from "../../../services/fusion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-from',
  templateUrl: './recipes-from.component.html',
  styleUrls: ['../details.component.css', './recipes-from.component.css']
})
export class RecipesFromComponent implements OnDestroy {
  recipesAll: Array<Recipe>;
  recipesToShow: Array<Recipe>;
  routeSubscription: Subscription;
  limit: number;
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
      this.recipesAll = fusonService.getPersonaFromRecipes(persona);
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

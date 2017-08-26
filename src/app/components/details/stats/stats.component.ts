import {Component, OnDestroy} from '@angular/core';
import { Persona } from "../../../model/persona";
import { PersonaService } from "../../../services/persona.service";
import { ActivatedRoute } from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['../details.component.css']
})
export class StatsComponent implements OnDestroy{
  persona: Persona;
  routeSubscription: Subscription;
  constructor( personaService: PersonaService, route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(x => this.persona = personaService.getPersonaByName(x.name));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

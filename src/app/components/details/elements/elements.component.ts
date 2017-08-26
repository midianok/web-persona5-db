import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonaService} from "../../../services/persona.service";
import {Persona} from "../../../model/persona";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['../details.component.css']
})
export class ElementsComponent implements OnDestroy{
  persona: Persona;
  routeSubscription: Subscription;
  constructor( personaService: PersonaService, route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(x => this.persona = personaService.getPersonaByName(x.name));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

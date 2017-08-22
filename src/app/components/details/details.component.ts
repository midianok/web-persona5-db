import { Component } from '@angular/core';
import { PersonaService } from "../../services/persona.service";
import { ActivatedRoute } from "@angular/router";
import { Persona } from "../../model/persona";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  persona: Persona;
  constructor(
    personaService: PersonaService,
    route: ActivatedRoute) {
    route.params.subscribe(x => {
      this.persona = personaService.getPersonaByName(x.name);
      window.scrollTo(0, 0);
    });
  }
}

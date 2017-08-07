import { Component } from '@angular/core';
import { PersonaManagerService } from "../../services/persona-manager.service";
import { ActivatedRoute } from "@angular/router";
import { Persona } from "../../model/persona";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  persona: Persona;

  constructor(personaManger: PersonaManagerService, route: ActivatedRoute) {
    const personaName = route.snapshot.params['name'];
    this.persona = personaManger.getPersonaByName(personaName);
  }

}

import {Component} from '@angular/core';
import {PersonaManagerService} from "../../services/persona-manager.service";
import {Aliment} from "../../model/aliment";

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent {
  personaManager: PersonaManagerService;

  constructor(personaManager: PersonaManagerService) {
    this.personaManager = personaManager;
  }

  alimentClicked(alimentName: string, alimentValue: string) {
    if (alimentValue === '-') {
      return;
    }
    this.personaManager.addFilterByAliment(new Aliment(alimentName, alimentValue));
  }
  
  getPersonasToShow() {
   return this.personaManager.getPersonasToShow();
  }
}


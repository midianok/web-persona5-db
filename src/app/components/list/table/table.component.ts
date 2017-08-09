import { Component } from '@angular/core';
import { PersonaManagerService } from '../../../services/persona-manager.service';
import { Aliment } from '../../../model/aliment';
import {Router} from "@angular/router";
import {SkillRepository} from "../../../data/skill-repository";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(private personaManager: PersonaManagerService,
              private router: Router) {}

  addFilterByAliment(alimentName: string, alimentValue: string) {
    if (alimentValue === '-') {
      return;
    }
    this.personaManager.addFilterByAliment(new Aliment(alimentName, alimentValue));
  }

  getPersonasToShow() {
    return this.personaManager.getPersonasToShow();
  }

  goToPersonaDetails(personaName: string) {
    this.router.navigate(['details', personaName]);
  }

}

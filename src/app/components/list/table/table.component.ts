import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Aliment } from '../../../model/aliment';
import { Router } from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(private personaService: PersonaService,
              private router: Router) {}

  addFilterByAliment(alimentName: string, alimentValue: string) {
    if (alimentValue === '-') return;
    this.personaService.addFilterByAliment(new Aliment(alimentName, alimentValue));
  }

  getPersonasToShow() {
    return this.personaService.getPersonasToShow();
  }

  goToPersonaDetails(personaName: string) {
    this.router.navigate(['details', personaName]);
  }

}

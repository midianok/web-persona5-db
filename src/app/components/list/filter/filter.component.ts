import {Component, ElementRef, ViewChild} from '@angular/core';
import {Aliment} from "../../../model/aliment";
import {PersonaService} from "../../../services/persona.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @ViewChild('searchInput') searchField: ElementRef;
  constructor(private personaService: PersonaService) { }

  getCurrentAlimentFilters() {
    return this.personaService.getCurrentAlimentFilters();
  }

  removeFilterByAliment(aliment: Aliment) {
    this.personaService.removeFilterByAliment(aliment);
  }

  filterByName() {
    this.personaService.addFilterByName(this.searchField.nativeElement.value);
  }
}

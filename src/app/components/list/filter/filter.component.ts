import {Component, ElementRef, ViewChild} from '@angular/core';
import {Aliment} from "../../../model/aliment";
import {PersonaManagerService} from "../../../services/persona-manager.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @ViewChild('searchInput') searchField: ElementRef;
  constructor(private personaManager: PersonaManagerService) { }

  getCurrentAlimentFilters() {
    return this.personaManager.getCurrentAlimentFilters();
  }

  removeFilterByAliment(aliment: Aliment) {
    this.personaManager.removeFilterByAliment(aliment);
  }

  filterByName() {
    this.personaManager.filterByName(this.searchField.nativeElement.value);
  }
}

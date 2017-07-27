import { Component, ElementRef, ViewChild} from "@angular/core";
import { Persona } from "./model/persona";
import { AlimentClicked } from "./model/aliment-clicked";
import { PersonaStaticDataRepository } from "./data/persona-staticdata-repository";
import {Repository} from "./infrastructure/repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PersonaStaticDataRepository ]
})
export class AppComponent {
  @ViewChild('searchInput') searchField: ElementRef;
  personasRepository: Array<Persona>;
  personasToShow: Array<Persona>;
  alimentFilters: Array<AlimentClicked> = [];
  alimentFiltersEmpty = true;

   constructor(personaStaticDataRepository: PersonaStaticDataRepository) {
     this.personasRepository = personaStaticDataRepository.getAll();
     this.personasToShow = this.personasRepository;
   }

  searchInputChanged() {
    const searchStr = this.searchField.nativeElement.value;
    this.personasToShow =
      this.personasRepository.filter(
        x => x.name.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      );
  }

  filterByAliment(clickedAliment: AlimentClicked) {
    const filterAlreadyAdded = this.alimentFilters.some(x =>
      x.alimentName === clickedAliment.alimentName && x.alimentValue === clickedAliment.alimentValue
    );
    if (filterAlreadyAdded) {
      return;
    }

    this.personasToShow = this.personasToShow.filter(
      x => x[clickedAliment.alimentName] === clickedAliment.alimentValue
    );

    this.alimentFilters.push(clickedAliment);
    this.alimentFiltersEmpty = false;
  }

  removeFilter(aliment: AlimentClicked) {
    this.alimentFilters = this.alimentFilters.filter(
      x => x !== aliment
    );

    if (this.alimentFilters.length !== 0){
      let filteredPersonas =  this.personasRepository;
      for (const alimentFilter of this.alimentFilters){
        filteredPersonas = filteredPersonas.filter(
          x => x[alimentFilter.alimentName] === alimentFilter.alimentValue
        );
      }
      this.personasToShow = filteredPersonas;
    } else {
      this.personasToShow = this.personasRepository;
      this.alimentFiltersEmpty = true;
    }
  }
}

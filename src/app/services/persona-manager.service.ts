import {Inject, Injectable} from "@angular/core";
import {Persona} from "../model/persona";
import {Aliment} from "../model/aliment";
import {PersonaRepository} from "../data/persona-repository";

@Injectable()
export class PersonaManagerService {
  private personasRepository: PersonaRepository;

  private alimentsFilterEmpty = true;
  private personasFilter: Array<Persona>;
  private alimentsFilter: Array<Aliment> = [];

  constructor(@Inject(PersonaRepository) repository ){
    this.personasRepository = repository;
    this.personasFilter = this.personasRepository.personas;

  }

  getPersonasToShow() {
    return this.personasFilter;
  }

  getPersonaByName(personaName: string) {
    return this.personasRepository.personas.find(
      x => x.name === personaName
    );
  }

  getCurrentAlimentFilters() {
    return this.alimentsFilter;
  }

  filterByName(nameFilter: string) {
    this.personasFilter =
      this.personasRepository.personas.filter(
        x => x.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())
      );
  }

  addFilterByAliment(clickedAliment: Aliment) {
    const filterAlreadyAdded = this.alimentsFilter.some(x =>
      x.alimentName === clickedAliment.alimentName && x.alimentValue === clickedAliment.alimentValue
    );

    if (filterAlreadyAdded) {
      return;
    }

    this.personasFilter = this.personasFilter.filter(
      x => x[clickedAliment.alimentName] === clickedAliment.alimentValue
    );

    this.alimentsFilter.push(clickedAliment);
    this.alimentsFilterEmpty = false;
  }

  removeFilterByAliment(aliment: Aliment) {
    this.alimentsFilter = this.alimentsFilter.filter(x => x !== aliment);

    if (this.alimentsFilter.length !== 0) {
      let filteredPersonas = this.personasRepository.personas;
      for (const alimentFilter of this.alimentsFilter) {
        filteredPersonas = filteredPersonas
          .filter(x => x[alimentFilter.alimentName] === alimentFilter.alimentValue);
      }
      this.personasFilter = filteredPersonas;
    } else {
      this.personasFilter = this.personasRepository.personas;
      this.alimentsFilterEmpty = true;
    }
  }
}

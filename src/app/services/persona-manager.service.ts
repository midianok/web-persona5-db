import {Inject, Injectable} from "@angular/core";
import {Persona} from "../model/persona";
import {PersonaStaticDataRepository} from "../data/persona-staticdata-repository";
import {Aliment} from "../model/aliment";

@Injectable()
export class PersonaManagerService {
  private personasRepository: PersonaStaticDataRepository;

  public alimentFiltersEmpty = true;
  public personasFilter: Array<Persona>;
  public alimentsFilter: Array<Aliment> = [];

  constructor(@Inject(PersonaStaticDataRepository) repository ){
    this.personasRepository = repository;
    this.personasFilter = this.personasRepository.personas;

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
    this.alimentFiltersEmpty = false;
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
      this.alimentFiltersEmpty = true;
    }
  }
}

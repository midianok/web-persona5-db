import {Inject, Injectable} from '@angular/core';
import {Persona} from '../model/persona';
import {Aliment} from '../model/aliment';
import {PersonaRepository} from '../data/persona-repository';

@Injectable()
export class PersonaService {
  private readonly allPersonas: Array<Persona>;
  private alimentsFilterEmpty = true;
  private personasFilter: Array<Persona>;
  private alimentsFilter: Array<Aliment> = [];

  constructor(@Inject(PersonaRepository) repository){
    const allPersonas = [];
    for (const key in repository.personasData) {
      if (!repository.personasData.hasOwnProperty(key)) continue;

      const persona = repository.personasData[key];
      persona.name = key;
      persona.strength = persona.stats[0];
      persona.magic = persona.stats[1];
      persona.endurance = persona.stats[2];
      persona.agility = persona.stats[3];
      persona.luck = persona.stats[4];
      const properties = ['physical', 'gun', 'fire', 'ice', 'electric', 'wind', 'psychic', 'nuclear', 'bless', 'curse'];
      const elemsValue = {"wk": 0, "-": 1, "rs": 2, "nu": 3, "rp": 4, "ab": 5};
      for (let i = 0; i < properties.length; i++) {
        persona[properties[i]] = persona.elems[i];
        persona[properties[i] + 'Value'] = elemsValue[persona.elems[i]];
      }
      allPersonas.push(persona);
    }
    this.allPersonas = allPersonas;
    this.personasFilter = this.allPersonas;
  }

  getAllPersonas(): Array<Persona> {
    return this.allPersonas;
  }

  getPersonasToShow(): Array<Persona> {
    return this.personasFilter;
  }

  getPersonaByName(personaName: string): Persona {
    return this.getAllPersonas().find(
      x => x.name === personaName
    );
  }

  getPersonasByArcana(arcanaName: string): Array<Persona> {
    return this.getAllPersonas().filter(
      x => x.arcana === arcanaName
    );
  }

  addFilterByName(nameFilter: string): void {
    this.personasFilter =
      this.getAllPersonas().filter(
        x => x.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())
      );
  }

  addFilterByAliment(clickedAliment: Aliment): void {
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

  removeFilterByAliment(aliment: Aliment): void {
    this.alimentsFilter = this.alimentsFilter.filter(x => x !== aliment);

    if (this.alimentsFilter.length !== 0) {
      let filteredPersonas = this.getAllPersonas();
      for (const alimentFilter of this.alimentsFilter) {
        filteredPersonas = filteredPersonas
          .filter(x => x[alimentFilter.alimentName] === alimentFilter.alimentValue);
      }
      this.personasFilter = filteredPersonas;
    } else {
      this.personasFilter = this.getAllPersonas();
      this.alimentsFilterEmpty = true;
    }
  }

  getCurrentAlimentFilters(): Array<Aliment> {
    return this.alimentsFilter;
  }


}

import {Inject, Injectable} from '@angular/core';
import {FusionRepository} from '../data/fusion-repository';
import {PersonaService} from './persona.service';
import {Persona} from '../model/persona';
import {Recipe} from '../model/recipe';

@Injectable()
export class FusionService {
  constructor(@Inject(FusionRepository) private fusonRepository,
              @Inject(PersonaService) private personaManager) { }

  public getPersonaToRecipes(persona: Persona): Array<Recipe> {

    if (persona.special) {
      const recipe = this.getSpecialPersonaRecipes(persona);
      return new Array(recipe);
    }

    const normalFusons = this.getNormalFusonRecipes(persona);
    const rareFusions = this.getRareFusionRecipes(persona);

    return normalFusons.concat(rareFusions);
  }

  private getRareFusionRecipes(persona: Persona): Array<Recipe> {
    const resultRecepies = [];
    const rarePersonas = this.personaManager.getAllPersonas().filter(x => x.rare);
    const normalPersonas = this.personaManager.getPersonasByArcana(persona.arcana);
    for (const rarePerosna of rarePersonas) {
      for (const normalPersona of normalPersonas) {
        if (rarePerosna === normalPersona) continue;

        const result = this.rareFuse(rarePerosna, normalPersona);
        if (!result || result.name !== persona.name) continue;

        const price = this.getCost([rarePerosna, normalPersona]);
        resultRecepies.push(new Recipe([rarePerosna, normalPersona], result, price));
      }
    }
    return resultRecepies;
  }

  private getNormalFusonRecipes(persona: Persona): Array<Recipe> {
    const resultRecepies = [];
    const possibleCombos = this.getPossibleCombosByResultArcana(persona.arcana);
    for (const combo of possibleCombos) {
      for (const firstIngredient of combo.firstIngredient) {
        if ( firstIngredient.name === persona.name) continue;
        for (const secondIngredient of combo.secondIngredient) {
          const recepieAlreadyAdded = resultRecepies.some(x =>
            x.ingredients[0] === firstIngredient  && x.ingredients[1] === secondIngredient ||
            x.ingredients[0] === secondIngredient && x.ingredients[1] === firstIngredient
          );
          if (secondIngredient.name === persona.name ||
            firstIngredient === secondIngredient   ||
            recepieAlreadyAdded) continue;

          const result = this.normalFuse(firstIngredient, secondIngredient);
          if (result && result.name === persona.name) {
            const price = this.getCost([firstIngredient, secondIngredient]);
            resultRecepies.push(new Recipe([firstIngredient, secondIngredient], result, price));
          }
        }
      }
    }
    return resultRecepies;
  }

  private normalFuse(persona1: Persona, persona2: Persona): Persona {
    if (!persona1.rare && persona2.rare ||
         persona1.rare && !persona2.rare) {
      return null;
    }
    const level = 1 + Math.floor((persona1.level + persona2.level) / 2);
    const resultArcana = this.getResultArcana(persona1.arcana, persona2.arcana);
    if (!resultArcana) return null;

    if (persona1.arcana !== persona2.arcana) {
      const possibleResults = this.personaManager.getPersonasByArcana(resultArcana).sort(Persona.sortByLvl);
      return possibleResults.find(x => x.level >= level && !(x.special || x.rare));
    } else {
      const possibleResults = this.personaManager.getPersonasByArcana(resultArcana).sort(Persona.sortByLvlDesc);
      return possibleResults.find(x =>  x.level <= level && !(x === persona1 || x === persona2) && !x.special);
    }
  }

  private rareFuse(rarePersona: Persona, mainPersona: Persona): Persona {
    const personae = this.personaManager.getPersonasByArcana(mainPersona.arcana).sort(Persona.sortByLvl);
    const mainPersonaIndex = personae.indexOf(mainPersona);
    let modifier = this.fusonRepository.rareCombos[mainPersona.arcana][this.fusonRepository.rarePersonae.indexOf(rarePersona.name)];
    let newPersona = personae[mainPersonaIndex + modifier];
    if (!newPersona) {
        return null;
    }
    if (newPersona.special) {
        if (modifier > 0)
            modifier++;
        else if (modifier < 0)
            modifier--;
        newPersona = personae[mainPersonaIndex + modifier];
    }
    return newPersona;
  }

  private getResultArcana(arcana1: string, arcana2: string): string {
    const arcanaCombo = this.fusonRepository.arcana2Combos.find(x =>
      x.source[0] === arcana1 && x.source[1] === arcana2
      ||
      x.source[0] === arcana2 && x.source[1] === arcana1
    );
    if (!arcanaCombo) return null;

    return arcanaCombo.result;
  }

  private getSpecialPersonaRecipes(persona: Persona): Recipe {
    for (const recipie of this.fusonRepository.specialCombos){
      if (recipie.result === persona.name){
        const ingridients = recipie.sources
          .map((personaName) => this.personaManager.getPersonaByName(personaName));
        const cost = this.getCost(ingridients);
        return new Recipe(ingridients, persona, cost);
      }
    }
  }

  private getPossibleCombosByResultArcana(arcana: string): Array<{firstIngredient: Array<Persona>, secondIngredient: Array<Persona>}> {
    const arcanaCombos = this.fusonRepository.arcana2Combos.filter(x => x.result === arcana);
    return arcanaCombos.map(x => {
      const firstIngredient = this.personaManager.getPersonasByArcana(x.source[0]);
      const secondIngredient = this.personaManager.getPersonasByArcana(x.source[1]);
      return {firstIngredient, secondIngredient};
    });
  }

  private getCost(ingridientPersonas: Array<Persona>): number {
    let cost = 0;
    for (const persona of ingridientPersonas) {
      cost += ((27 * (persona.level * persona.level)) + (126 * persona.level) + 2147);
    }
    return cost;
  }

  public getPersonaFromRecipes(persona: Persona): Array<Recipe> {

    const resultRecipes = [];
    const allPersonas = this.personaManager.getAllPersonas();
    let resultPersona;
    for (const persona2 of allPersonas ) {
      if (!persona2.rare && persona.rare || persona2.rare && !persona.rare) {
        const rarePersona = persona.rare ? persona : persona2;
        const normalPersona = persona.rare ? persona2 : persona;
        resultPersona = this.rareFuse(rarePersona, normalPersona);
      } else {
        resultPersona = this.normalFuse(persona, persona2);
      }
      if (resultPersona) {
        const cost = this.getCost([persona, persona2]);
        resultRecipes.push(new Recipe([persona2], resultPersona, cost));
      }
    }

    return resultRecipes;

  }

}

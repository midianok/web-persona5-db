import {Inject, Injectable} from '@angular/core';
import {FusonRepository} from '../data/fuson-repository';
import {PersonaService} from './persona.service';
import {Persona} from '../model/persona';
import {Recipe} from '../model/recipe';

@Injectable()
export class FusonService {
  constructor(@Inject(FusonRepository) private fusonRepository,
              @Inject(PersonaService) private personaManager) { }

  public getPersonaToRecipes(persona: Persona): Array<Recipe> {
    const resultRecepie = [];

    if (persona.special){
      const recipe = this.getSpecialPersonaRecipes(persona);
      resultRecepie.push(recipe);
      return resultRecepie;
    }

    const possibleCombos = this.getPossibleCombosByArcana(persona.arcana);
    for (const combo of possibleCombos) {
      for (const firstIngredient of combo.firstIngredient) {
        if ( firstIngredient.name === persona.name) continue;
        for (const secondIngredient of combo.secondIngredient) {
          const recepieAlreadyAdded = resultRecepie.some(x =>
            x.ingredients[0] === firstIngredient && x.ingredients[1] === secondIngredient ||
            x.ingredients[0] === secondIngredient && x.ingredients[1] === firstIngredient
          );

          if (secondIngredient.name === persona.name ||
              firstIngredient === secondIngredient ||
              recepieAlreadyAdded) continue;

          const result = this.normalFuse(firstIngredient, secondIngredient);
          if (result && result.name === persona.name) {
            const price = this.getApproxCost(firstIngredient, secondIngredient);
            resultRecepie.push(new Recipe([firstIngredient, secondIngredient], result, price));
          }
        }
      }
    }
    return resultRecepie;
  }

  private normalFuse(persona1: Persona, persona2: Persona ): Persona {
    if ((persona1.rare || persona2.rare)) {
      return null;
    }
    const level = 1 + Math.floor((persona1.level + persona2.level) / 2);
    const resultArcana = this.getResultArcana(persona1.arcana, persona2.arcana);

    if (persona1.arcana !== persona2.arcana) {
      const possibleResults = this.personaManager.getPersonasByArcana(resultArcana).sort(Persona.sortByLvl);
      return possibleResults.find(x => x.level >= level);
    } else {
      const possibleResults = this.personaManager.getPersonasByArcana(resultArcana).sort(Persona.sortByLvlDesc);
      return possibleResults.find(x =>  x.level <= level && !(x === persona1 || x === persona2));
    }
  }

  private getResultArcana(arcana1: string, arcana2: string): string {
    const arcanaCombo = this.fusonRepository.arcana2Combos.find(x =>
      x.source[0] === arcana1 && x.source[1] === arcana2
      ||
      x.source[0] === arcana2 && x.source[1] === arcana1
    );
    return arcanaCombo.result;
  }

  private getSpecialPersonaRecipes(persona: Persona): Recipe {
    for (const recipie of this.fusonRepository.specialCombos){
      if (recipie.result === persona.name){
        const ingridients = recipie.sources
          .map((personaName) => this.personaManager.getPersonaByName(personaName));
        return new Recipe(ingridients, persona, 0);
      }
    }
  }

  private getPossibleCombosByArcana(arcana: string): Array<{firstIngredient: Array<Persona>, secondIngredient: Array<Persona>}> {
    const arcanaCombos = this.fusonRepository.arcana2Combos.filter(x => x.result === arcana);
    return arcanaCombos.map(x => {
      const firstIngredient = this.personaManager.getPersonasByArcana(x.source[0]);
      const secondIngredient = this.personaManager.getPersonasByArcana(x.source[1]);
      return {firstIngredient, secondIngredient};
    });
  }

  private getApproxCost(persona1: Persona, persona2: Persona): number {
    return ((27 * persona1.level * persona1.level) + (126 * persona1.level) + 2147) +
           ((27 * persona2.level * persona2.level) + (126 * persona2.level) + 2147);
  }
}

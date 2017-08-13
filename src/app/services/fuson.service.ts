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
    const arcanaCombos = this.fusonRepository.arcana2Combos.filter(x => x.result === persona.arcana);

    const personaCombos = arcanaCombos.map(x => {
      const firstIngredient = this.personaManager.getPersonasByArcana(x.source[0]);
      const secondIngredient = this.personaManager.getPersonasByArcana(x.source[1]);
      return {firstIngredient, secondIngredient};
    });

    const resultRecepie = [];
    for (const combo of personaCombos) {
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

          const result = this.fuse(firstIngredient, secondIngredient);
          if (result && result.name === persona.name) {
            resultRecepie.push(new Recipe([firstIngredient, secondIngredient], result));
          }
        }
      }
    }
    return resultRecepie;
  }

  private fuse(persona1: Persona, persona2: Persona ): Persona {
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
}

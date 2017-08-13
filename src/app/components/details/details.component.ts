import { Component } from '@angular/core';
import { PersonaManagerService } from "../../services/persona-manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Persona } from "../../model/persona";
import {SkillRepository} from "../../data/skill-repository";
import {Skill} from "../../model/skill";
import {Recipe} from "../../model/recipe";
import {FusonService} from "../../services/fuson.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  persona: Persona;
  skills: Array<Skill>;
  recipes: Array<Recipe>;

  constructor(personaManagerService: PersonaManagerService,
              fusonService: FusonService,
              skillRepository: SkillRepository,
              route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(x => {
      const personaName = x.name;
      this.persona = personaManagerService.getPersonaByName(personaName);
      this.skills = skillRepository.getSkillsByPersonaName(personaName);
      this.recipes = fusonService.getPersonaToRecipes(this.persona);
    });
  }

  goToPersonaDetails(personaName: string) {
    this.router.navigate(['details', personaName]);
  }
}

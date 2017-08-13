import { Component } from '@angular/core';
import { PersonaService } from "../../services/persona.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Persona } from "../../model/persona";
import {Skill} from "../../model/skill";
import {Recipe} from "../../model/recipe";
import {FusonService} from "../../services/fuson.service";
import {SkillService} from "../../services/skill.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  persona: Persona;
  skills: Array<Skill>;
  recipes: Array<Recipe>;

  constructor(personaService: PersonaService,
              fusonService: FusonService,
              skillService: SkillService,
              route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(x => {
      const personaName = x.name;
      this.persona = personaService.getPersonaByName(personaName);
      this.skills = skillService.getSkillsByPersonaName(personaName);
      this.recipes = fusonService.getPersonaToRecipes(this.persona);
    });
  }

  goToPersonaDetails(personaName: string): void {
    this.router.navigate(['details', personaName]);
  }
}

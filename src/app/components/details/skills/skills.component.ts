import {Component, OnDestroy} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Skill } from "../../../model/skill";
import { SkillService } from "../../../services/skill.service";
import {PersonaService} from "../../../services/persona.service";
import {Persona} from "../../../model/persona";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: [
    '../details.component.css',
    './skills.component.css'
  ]
})
export class SkillsComponent implements OnDestroy{
  skills: Array<Skill>;
  routeSubscription: Subscription;
  constructor(
    skillService: SkillService,
    route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(x => {
      const personaName = x.name;
      this.skills = skillService.getSkillsByPersonaName(personaName);

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

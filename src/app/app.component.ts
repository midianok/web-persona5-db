import { Component} from "@angular/core";
import { PersonaRepository } from "./data/persona-repository";
import { SkillRepository } from "./data/skill-repository";
import { FusionRepository } from "./data/fusion-repository";
import { FusionService } from "./services/fusion.service";
import { SkillService } from "./services/skill.service";
import { PersonaService } from "./services/persona.service";

@Component({
  selector: 'app-root',
  template: `
    <h1 class="text-center"><a routerLink="/">Persona 5 fusion calculator</a></h1>
    <router-outlet></router-outlet>`,
  providers: [
    PersonaRepository,
    SkillRepository,
    FusionRepository,
    PersonaService,
    FusionService,
    SkillService,
    ]
})
export class AppComponent {
}

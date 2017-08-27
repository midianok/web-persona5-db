import { Component} from "@angular/core";
import { PersonaRepository } from "./data/persona-repository";
import { SkillRepository } from "./data/skill-repository";
import { FusonRepository } from "./data/fuson-repository";
import { FusonService } from "./services/fuson.service";
import { SkillService } from "./services/skill.service";
import { PersonaService } from "./services/persona.service";

@Component({
  selector: 'app-root',
  template: `
    <h1 class="text-center"><a routerLink="/">Persona 5 fuson calculator</a></h1>
    <router-outlet></router-outlet>`,
  providers: [
    PersonaRepository,
    SkillRepository,
    FusonRepository,
    PersonaService,
    FusonService,
    SkillService,
    ]
})
export class AppComponent {
}

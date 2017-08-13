import { Component} from "@angular/core";
import { PersonaRepository } from "./data/persona-repository";
import { SkillRepository } from "./data/skill-repository";
import { FusonRepository } from "./data/fuson-repository";
import { FusonService } from "./services/fuson.service";
import { SkillService } from "./services/skill.service";
import { PersonaService } from "./services/persona.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
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

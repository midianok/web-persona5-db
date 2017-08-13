import { Component} from "@angular/core";
import {PersonaManagerService} from "./services/persona-manager.service";
import {PersonaRepository} from "./data/persona-repository";
import {SkillRepository} from "./data/skill-repository";
import {FusonRepository} from "./data/fuson-repository";
import {FusonService} from "./services/fuson.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    PersonaManagerService,
    FusonService,
    PersonaRepository,
    SkillRepository,
    FusonRepository,
    ]
})
export class AppComponent {
}

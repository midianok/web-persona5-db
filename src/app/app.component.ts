import { Component} from "@angular/core";
import {PersonaManagerService} from "./services/persona-manager.service";
import {PersonaRepository} from "./data/persona-repository";
import {SkillRepository} from "./data/skill-repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ PersonaManagerService, PersonaRepository, SkillRepository ]
})
export class AppComponent {
}

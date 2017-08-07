import { Component} from "@angular/core";
import {PersonaManagerService} from "./services/persona-manager.service";
import {PersonaRepository} from "./data/persona-repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ PersonaManagerService, PersonaRepository ]
})
export class AppComponent {
}

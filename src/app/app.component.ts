import { Component} from "@angular/core";
import {PersonaManagerService} from "./services/persona-manager.service";
import {PersonaStaticDataRepository} from "./data/persona-staticdata-repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PersonaManagerService, PersonaStaticDataRepository ]
})
export class AppComponent {
}

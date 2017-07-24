import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Persona} from "../model/persona";
import {AlimentClickedEventArg} from "../model/status-clicked-event-arg";

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent {
  @Input() personasList: Array<Persona>;
  @Output() statClicked = new EventEmitter<AlimentClickedEventArg>();

  statusClicked(alimentName: string, alimentValue: string) {
    this.statClicked.emit(new AlimentClickedEventArg(alimentName, alimentValue));
  }
}


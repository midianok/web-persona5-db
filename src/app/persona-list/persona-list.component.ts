import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Persona} from "../model/persona";
import {AlimentClicked} from "../model/aliment-clicked";

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent {
  @Input() personasList: Array<Persona>;
  @Output() statClicked = new EventEmitter<AlimentClicked>();

  statusClicked(alimentName: string, alimentValue: string) {
    this.statClicked.emit(new AlimentClicked(alimentName, alimentValue));
  }
}


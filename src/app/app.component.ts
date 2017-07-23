import {Component} from "@angular/core";
import {PersonasData} from "./data/personas-data";
import {Persona} from "./model/Persona";
import {AlimentClickedEventArg} from "./model/status-clicked-event-arg";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   personaRepository: Array<Persona>;
   personasToShow: Array<Persona>;

   constructor(){
     this.personaRepository = PersonasData.getRepository();
     this.personasToShow = this.personaRepository;
   }

  filterBySearchRequest(searchStr){
     if (searchStr.length === 0){
      this.personasToShow = this.personaRepository;
    }
    const result = [];
    for (const persona of this.personaRepository){
      if (persona.name.toLowerCase().includes(searchStr.toLocaleLowerCase())){
        result.push(persona);
      }
    }
    this.personasToShow = result;
  }

  filterByAliment(clickedAliment: AlimentClickedEventArg){
    const result = [];
    for (const persona of this.personasToShow){
      if (persona[clickedAliment.alimentName] === clickedAliment.alimentValue) {
        result.push(persona);
      }
    }
    this.personasToShow = result;
  }

}

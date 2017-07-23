import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() inputed = new EventEmitter<string>();

  searchInputChange(inputEvent){
    this.inputed.emit(inputEvent.target.value);
  }

}

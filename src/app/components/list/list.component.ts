import {Component} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  constructor() {
    window.scrollTo(0, 0);
  }
}


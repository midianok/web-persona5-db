import {Component} from '@angular/core';
import {FusonService} from "../../services/fuson.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  constructor(private f: FusonService) {}
}


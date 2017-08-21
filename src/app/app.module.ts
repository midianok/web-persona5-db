import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent} from "./components/details/details.component";
import { FilterComponent} from "./components/list/filter/filter.component";
import { TableComponent } from './components/list/table/table.component';

import { OrderbyPipe } from './infrastructure/orderby.pipe';

const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'details/:name', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    FilterComponent,
    TableComponent,
    OrderbyPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

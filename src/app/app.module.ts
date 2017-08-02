import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonaListComponent } from './components/persona-list/persona-list.component';
import { OrderbyPipe } from './infrastructure/orderby.pipe';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaListComponent,
    OrderbyPipe,
    FilterComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

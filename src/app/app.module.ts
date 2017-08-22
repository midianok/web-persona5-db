import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent} from "./components/details/details.component";
import { FilterComponent} from "./components/list/filter/filter.component";
import { TableComponent } from './components/list/table/table.component';

import { OrderbyPipe } from './infrastructure/orderby.pipe';
import { RecipesToComponent } from './components/details/recipes-to/recipes-to.component';
import { SkillsComponent } from './components/details/skills/skills.component';
import { StatsComponent } from './components/details/stats/stats.component';
import { ElementsComponent } from './components/details/elements/elements.component';
import { RecipesFromComponent } from './components/details/recipes-from/recipes-from.component';
import {LimitPipe} from "./infrastructure/limit.pipe";

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
    OrderbyPipe,
    LimitPipe,
    RecipesToComponent,
    SkillsComponent,
    StatsComponent,
    ElementsComponent,
    RecipesFromComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

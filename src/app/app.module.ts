import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContextBarComponent } from './context-bar/context-bar.component';
import { TimeRangeComponent } from './context-bar/time-range/time-range.component';
import { TimeRangeBarComponent } from './context-bar/time-range/time-range-bar/time-range-bar.component';
import { MapComponent } from './context-bar/map/map.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { PlaceWindowComponent } from './place-window/place-window.component';
import { PlaceCardComponent } from './place-window/area/place-card/place-card.component';
import { AreaComponent } from './place-window/area/area.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContextBarComponent,
    TimeRangeComponent,
    TimeRangeBarComponent,
    MapComponent,
    SafeUrlPipe,
    PlaceWindowComponent,
    PlaceCardComponent,
    AreaComponent,
    FilterBarComponent,
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

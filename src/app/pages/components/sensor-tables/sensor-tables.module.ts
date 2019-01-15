import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {SensorTablesComponent} from "./sensor-tables.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    SensorTablesComponent,
  ],
  exports: [
    SensorTablesComponent,
  ]
})
export class SensorTablesModule {

}

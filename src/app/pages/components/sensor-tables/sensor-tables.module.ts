import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {SensorTablesComponent} from "./sensor-tables.component";

@NgModule({
  imports: [
    ThemeModule,
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

import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {SensorValuesComponent} from './sensor-values.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    SensorValuesComponent,
  ],
  exports: [
    SensorValuesComponent,
  ]
})
export class SensorValuesModule {
}

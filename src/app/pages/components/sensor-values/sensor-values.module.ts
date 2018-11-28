import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {SensorValuesComponent} from './sensor-values.component';

@NgModule({
  imports: [
    ThemeModule,
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

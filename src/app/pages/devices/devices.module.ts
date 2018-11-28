import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NgxEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';

import {MomentModule} from 'ngx-moment';

import {DevicesComponent} from './devices.component';
import {DetailsComponent} from './details/details.component';
import {TemperatureComponent} from './details/temperature/temperature.component';
import {StatusCardComponent} from './details/status-card/status-card.component';
import {TemperatureGraphComponent} from './details/temperature-graph/temperature-graph';
import {SensorValuesModule} from '../components/sensor-values/sensor-values.module';
import {SensorGraphsModule} from '../components/sensor-graphs/sensor-graphs.module';
import {SensorTablesModule} from '../components/sensor-tables/sensor-tables.module';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    MomentModule,
    RouterModule,
    SensorValuesModule,
    SensorGraphsModule,
    SensorTablesModule
  ],
  declarations: [
    DevicesComponent,
    DetailsComponent,
    TemperatureComponent,
    StatusCardComponent,
    TemperatureGraphComponent,
  ],
})
export class DevicesModule {
}

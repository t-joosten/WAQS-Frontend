import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NgxEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';

import {MomentModule} from 'ngx-moment';

import {DevicesComponent} from './devices.component';
import {DetailsComponent} from './details/details.component';
import {SensorValuesModule} from '../components/sensor-values/sensor-values.module';
import {SensorGraphsModule} from '../components/sensor-graphs/sensor-graphs.module';
import {SensorTablesModule} from '../components/sensor-tables/sensor-tables.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {NbTabsetModule} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    MomentModule,
    RouterModule,
    SensorValuesModule,
    SensorGraphsModule,
    SensorTablesModule,
    NgxPaginationModule,
    NbTabsetModule,
  ],
  declarations: [
    DevicesComponent,
    DetailsComponent,
  ],
})
export class DevicesModule {
}

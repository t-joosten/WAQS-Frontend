import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../../@theme/theme.module';

import {SensorGraphsComponent} from './sensor-graphs.component';

const components = [
  SensorGraphsComponent,
];

@NgModule({
  imports: [ThemeModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...components],
  exports: [...components],
})
export class SensorGraphsModule {}

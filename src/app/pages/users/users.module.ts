import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NgxEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';

import {MomentModule} from 'ngx-moment';
import {UsersComponent} from "./users.component";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    MomentModule,
    RouterModule,
    NgxPaginationModule,
  ],
  declarations: [
    UsersComponent,
  ],
})
export class UsersModule {
}

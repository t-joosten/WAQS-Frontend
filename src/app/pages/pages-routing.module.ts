import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {DevicesComponent} from './devices/devices.component';
import {DetailsComponent} from './devices/details/details.component';
import {InfoComponent} from './info/info.component';
import {EchartsComponent} from "./charts/echarts/echarts.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'devices',
      component: DevicesComponent,
    },
    {
      path: 'devices/:id',
      component: DetailsComponent,
    }, {
      path: 'info',
      component: InfoComponent,
    }, {
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

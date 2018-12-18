import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import {Device} from '../../models/device.model';
import {DeviceService} from '../../services/device/device.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  public devicesLoaded = false;
  public devices: Device[];
  public selectedDevice: Device;
  private alive = true;

  public currentPage : number = 1;
  public pageSize : number = 1;
  public countDevices: number = 0;
  public pages : number = 1;

  constructor(private themeService: NbThemeService, private deviceService: DeviceService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.deviceService.getAllDevices(0, true).subscribe((devices) => {
          this.devices = devices;
          this.devicesLoaded = true;
        }, (err) => {
        });
      });
  }

  deviceSelectedHandler(device: Device) {
    this.selectedDevice = device;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

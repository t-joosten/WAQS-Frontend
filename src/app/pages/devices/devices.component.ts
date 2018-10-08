import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../services/device/device.service';
import {Device} from '../../models/device.model';


@Component({
  selector: 'ngx-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [DeviceService],
})
export class DevicesComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.deviceService
      .getAllDevices()
      .subscribe(
        (devices) => {
          // console.log(devices);
          this.devices = devices;
        },
      );
  }

}

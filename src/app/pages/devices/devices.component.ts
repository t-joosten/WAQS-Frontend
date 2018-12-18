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
  public currentPage : number = 1;
  public pageSize : number = 1;
  public countDevices: number = 0;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.getDevices();
  }

  private getDevices() {
    this.deviceService
      .getAllDevices(this.currentPage).subscribe((res)=> {
        this.devices = res.docs;
        this.currentPage = res.page;
        this.countDevices = res.total;
        this.pageSize = res.limit;
      },
    );
  };

  public pageChanged(value) {
    this.currentPage = value;
    this.getDevices();
  }

}

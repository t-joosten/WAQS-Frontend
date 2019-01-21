import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

import {takeWhile} from 'rxjs/operators/takeWhile';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Device} from '../../../models/device.model';
import {DeviceService} from '../../../services/device/device.service';
import {Socket} from 'ngx-socket-io';
import {EChartOption} from 'echarts';
import {ToastrService} from 'ngx-toastr';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value: string;
}

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnDestroy, OnInit {
  public outdated = false;
  private alive = true;
  public device: Device = null;
  private lastMeasurementSubscription: any;
  private index: number = 0;

  public isEditingName = false;

  constructor(private themeService: NbThemeService, private measurementService: MeasurementService,
              private deviceService: DeviceService, private route: ActivatedRoute, private router: Router,
              private socket: Socket, private toastr: ToastrService) {

  }

  private getLastMeasurementValue(id) {
    this.lastMeasurementSubscription = this.measurementService.getLastMeasurements(id)
      .subscribe(
        (lastMeasurement) => {
          // console.log(this.device['_id'] + ' ' + lastMeasurement.device);
          if (this.device['_id'] === lastMeasurement.device) {

            this.checkIfDataOutdated(lastMeasurement);
          }
        });
  }

  private checkIfDataOutdated(lastMeasurement) {
    const lastUpdate = new Date(lastMeasurement.createdAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - lastUpdate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.outdated = diffDays > 1;
  }

  public editName() {
    this.isEditingName = true;
  }

  public saveName(name) {
    this.device.name = name;

    this.deviceService.updateDevice(this.device).toPromise().then((res) => {
      this.isEditingName = false;
      this.toastr.success('De naam van het apparaat is aangepast.', 'Apparaat wijzigen');
    }).catch((err) => {
      this.isEditingName = false;
      this.toastr.error('De naam van het apparaat kan niet aangepast worden.', 'Apparaat wijzigen');
    });
  }

  public deleteDevice() {
    this.deviceService.deleteDevice(this.device._id).toPromise().then(() => {
      this.router.navigate(['/pages/devices']);
      this.toastr.error('Het apparaat is verwijdered.', 'Apparaat verwijderen');
    }).catch((err) => {
      this.toastr.error('Het apparaat kan niet verwijderd worden.', 'Apparaat verwijderen');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener(`device/` + this.device._id);
    this.alive = false;
  }

  ngOnInit(): void {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
      });

    this.route.params
      .pipe(takeWhile(() => this.alive))
      .subscribe(params => {
        const id = params['id'];

        this.socket.on(`device/` + id, (res) => {
          console.log(res);
          this.device.battery = res.device.battery;
          this.device.alt = res.device.alt;
          this.device.lat = res.device.lat;
          this.device.long = res.device.long;
          this.device.sensorValuesUpdatedAt = res.device.sensorValuesUpdatedAt;
          this.device.deviceValuesUpdatedAt = res.device.deviceValuesUpdatedAt;
          this.device.updatedAt = res.device.updatedAt;
        });

        this.deviceService.getDevice(id)
          .pipe(takeWhile(() => this.alive))
          .subscribe((device) => {
            this.device = device;
          });

        /*this.getLastMeasurementValue(id);

        setInterval(() => {
          this.getLastMeasurementValue(id);
        }, 3000);*/
      });
  }
}

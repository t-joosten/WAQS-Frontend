import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService } from '@nebular/theme';

import {takeWhile} from 'rxjs/operators/takeWhile';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Device} from '../../../models/device.model';
import {DeviceService} from '../../../services/device/device.service';
import {Socket} from 'ngx-socket-io';
import {EChartOption} from 'echarts';

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

  temperaturerCard: CardSettings = {
    title: 'Temperatuur',
    iconClass: 'nb-sunny',
    type: 'warning',
    value: '-',
  };

  pHCard: CardSettings = {
    title: 'pH',
    iconClass: 'nb-drop',
    type: 'primary',
    value: '-',
  };

  /*humidityCard: CardSettings = {
    title: 'Luchtvochtigheid',
    iconClass: 'nb-drop',
    type: 'info',
    value: '-',
  };*/
  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.temperaturerCard,
    // this.humidityCard,
    this.pHCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService, private measurementService: MeasurementService,
              private deviceService: DeviceService, private route: ActivatedRoute, private router: Router,
              private socket: Socket, ) {

  }

  private getLastMeasurementValue(id) {
    this.lastMeasurementSubscription = this.measurementService.getLastMeasurement(id)
      .subscribe(
        (lastMeasurement) => {
          // console.log(this.device['_id'] + ' ' + lastMeasurement.device);
          if (this.device['_id'] === lastMeasurement.device) {

            this.checkIfDataOutdated(lastMeasurement);

            const temperature = lastMeasurement.values.Temperature;
            const pH = lastMeasurement.values.pH;
            // const humidity = lastMeasurement.values.Humidity;

            if (temperature !== undefined) {
              this.temperaturerCard.value = temperature;
            }

            if (pH !== undefined) {
              this.pHCard.value = pH;
            }

            /*if (humidity !== undefined) {
              this.humidityCard.value = humidity;
            }*/
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
    });
  }

  public deleteDevice() {
    this.deviceService.deleteDevice(this.device._id).toPromise().then(() => {
      this.router.navigate(['/pages/devices']);
    })
  }

  ngOnDestroy() {
    // this.socket.removeListener('chat message');
    this.alive = false;
  }

  ngOnInit(): void {
    /*this.socket.on('connection', function (res) {
      res.on('chat message', function (msg) {
        // console.log('message: ' + msg);
      });
    });

    this.socket.on('chat message', (res) => {
      // console.log(res);
    });*/

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.route.params
      .pipe(takeWhile(() => this.alive))
      .subscribe(params => {
        const id = params['id'];
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

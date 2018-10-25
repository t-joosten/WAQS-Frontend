import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

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
export class DetailsComponent implements OnDestroy {
  public outdated = false;
  private alive = true;
  public device: Device = null;

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    }],
  };

  temperaturerCard: CardSettings = {
    title: 'Temperatuur',
    iconClass: 'nb-sunny',
    type: 'warning',
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
              private deviceService: DeviceService, private route: ActivatedRoute,
              private socket: Socket) {
    socket.on('connection', function (res) {
      res.on('chat message', function (msg) {
        // console.log('message: ' + msg);
      });
    });

    this.socket.on('chat message', (res) => {
      // console.log(res);
    });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.deviceService.getDevice(id).subscribe((device) => {
        this.device = device;
      });

      this.getLastMeasurementValue(id);

      setInterval(() => {
        this.getLastMeasurementValue(id);
      }, 3000);
    });
  }

  private getLastMeasurementValue(id) {
    this.measurementService.getLastMeasurement(id).subscribe((lastMeasurement) => {
      this.checkIfDataOutdated(lastMeasurement);

      const temperature = lastMeasurement.values.Temperature;
      // const humidity = lastMeasurement.values.Humidity;

      if (temperature !== undefined) {
        this.temperaturerCard.value = temperature;
      }

      /*if (humidity !== undefined) {
        this.humidityCard.value = humidity;
      }*/
    });
  }

  private checkIfDataOutdated(lastMeasurement) {
    const lastUpdate = new Date(lastMeasurement.createdAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - lastUpdate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.outdated = diffDays > 1;
  }

  ngOnDestroy() {
    this.socket.removeListener('chat message');
    this.alive = false;
  }
}

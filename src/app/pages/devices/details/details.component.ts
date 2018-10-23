import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

import {takeWhile} from 'rxjs/operators/takeWhile';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Device} from '../../../models/device.model';
import {DeviceService} from '../../../services/device/device.service';
import {Socket} from "ngx-socket-io";

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

  temperaturerCard: CardSettings = {
    title: 'Temperatuur',
    iconClass: 'nb-sunny',
    type: 'warning',
    value: '-',
  };

  humidityCard: CardSettings = {
    title: 'Luchtvochtigheid',
    iconClass: 'nb-drop',
    type: 'info',
    value: '-',
  };
  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.temperaturerCard,
    this.humidityCard,
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
              private deviceService: DeviceService, private router: Router, private route: ActivatedRoute,
              private socket: Socket) {
    socket.emit('connection', 'banaan', (res) => {
      console.log(res);
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

      this.updateMeasurementValues(id);

      setInterval(() => {
        this.updateMeasurementValues(id);
      }, 3000);
    });
  }

  private updateMeasurementValues(id) {
    this.measurementService.getLastMeasurement(id).subscribe((lastMeasurement) => {
      this.checkDataOutdated(lastMeasurement);

      const temperature = lastMeasurement.values.Temperature;
      const humidity = lastMeasurement.values.Humidity;

      if (temperature !== undefined) {
        this.temperaturerCard.value = temperature;
      }

      if (humidity !== undefined) {
        this.humidityCard.value = humidity;
      }
    });
  }

  private checkDataOutdated(lastMeasurement) {
    const lastUpdate = new Date(lastMeasurement.createdAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - lastUpdate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.outdated = diffDays > 1;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

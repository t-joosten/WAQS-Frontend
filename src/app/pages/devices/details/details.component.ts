import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

import {takeWhile} from 'rxjs/operators/takeWhile' ;
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {ActivatedRoute} from '@angular/router';

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

  private alive = true;

  temperaturerCard: CardSettings = {
    title: 'Temperatuur',
    iconClass: 'nb-sunny',
    type: 'warning',
    value: '23',
  };

  humidityCard: CardSettings = {
    title: 'Luchtvochtigheid',
    iconClass: 'nb-drop',
    type: 'info',
    value: '44',
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
    corporate: [
      {
        ...this.temperaturerCard,
        type: 'secondary',
      },
      {
        ...this.humidityCard,
        type: 'danger',
      },
    ],
  };

  constructor(private themeService: NbThemeService, private measurementService: MeasurementService,
              /*private deviceService: DeviceService, private router: Router,*/ private route: ActivatedRoute) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.route.params.subscribe(params => {
      const id = params['id'];
      /*this.deviceService.getDevice(id).subscribe((device) => {
        console.log(device);
      });*/

      /*this.measurementService.getMeasurements(id).subscribe((measurements) => {

        const lastMeasurement = measurements[measurements.length - 1];

        const temperature = lastMeasurement.values.Temperature;
        const humidity = lastMeasurement.values.Humidity;

        if (temperature !== undefined) {
          this.temperaturerCard.value = temperature;
        }

        if (humidity !== undefined) {
          this.humidityCard.value = humidity;
        }
      });*/
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

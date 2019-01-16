import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {EChartOption, ECharts, init} from 'echarts';
import {Device} from '../../../models/device.model';
import {MeasurementService} from '../../../services/measurement/measurement.service';

@Component({
  selector: 'ngx-sensor-graphs',
  template: `
    <nb-tabset>
      <nb-tab tabTitle="Temperatuur" *ngFor="let options of multiOptions">
        <div echarts [options]="options" [merge]="updateOptions" class="echart mt-4"></div>
      </nb-tab>
    </nb-tabset>`,
  styleUrls: ['./sensor-graphs.component.scss']
})
export class SensorGraphsComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() selectedDevice: Device;
  multiOptions = [];
  // options: EChartOption = {};
  updateOptions: EChartOption = {};

  timer: any;

  themeSubscription: any;

  data = [];

  oneDay = 24 * 3600 * 1000;
  fiveMinutes = 5 * 60 * 1000;
  oneMonth = 30 * 24 * 3600 * 1000;
  now = new Date(2018, 3, 11);
  value = Math.random() * 4 + 18;

  constructor(private theme: NbThemeService, private measurementService: MeasurementService) {
  }

  randomData() {
    this.now = new Date(+this.now + this.fiveMinutes);
    this.value = Math.random() * 4 + 18;
    return {
      name: this.now.toString(),
      value: [
        this.now,
        Math.round(this.value)
      ]
    }
  }

  getMeasurementData(deviceId) {
    this.measurementService.getLastThreeDayMeasurements(deviceId).subscribe(
      (res) => {
        /*const colors: any = config.variables;
        const echarts: any = config.variables.echarts;*/
        let index = 0;

        res.forEach((measurementData) => {
          const data = [];

          measurementData.forEach((measurement) => {
            data.push({
              name: new Date(measurement.createdAt).toString(),
              value: [
                new Date(measurement.createdAt),
                Math.round(measurement.value),
              ]
            });
          });

          const options = {
            backgroundColor: '#e2e2e2',
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            title: {
              text: 'Temperatuur'
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                params = params[0];
                const date = new Date(params.name);
                return ('0' + (date.getDate())).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() +
                  ' ' + ('0' + (date.getHours())).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2) + ' = ' + params.value[1];
              },
              axisPointer: {
                animation: false
              }
            },
            xAxis: {
              type: 'time',
              splitLine: {
                show: false
              }
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              name: 'Tijd',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              data: data
            }],
          };

          this.multiOptions.push(options);
        });

        /*this.timer = setInterval(() => {

          for (let i = 0; i < 5; i++) {
            this.data.shift();
            this.data.push(this.randomData());
          }

          this.updateOptions = {
            series: [{
              data: this.data
            }]
          }
        }, 1000);*/
        console.log(res)
      }, (err) => {
        console.log(err);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property === 'selectedDevice') {
        this.selectedDevice = changes[property].currentValue;
        this.getMeasurementData(this.selectedDevice._id);
      }
    }
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    clearInterval(this.timer);
  }
}

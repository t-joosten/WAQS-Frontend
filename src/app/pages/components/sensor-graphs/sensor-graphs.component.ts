import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {EChartOption, ECharts, init} from 'echarts';
import {Device} from '../../../models/device.model';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {SubstanceService} from '../../../services/substance/substance.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'ngx-sensor-graphs',
  template: `
    <nb-tabset>
      <nb-tab tabTitle="{{options.title.name}}" *ngFor="let options of multiOptions; let i = index;">
        <div echarts [options]="options" [merge]="multiUpdateOptions[i]" class="echart"></div>
      </nb-tab>
    </nb-tabset>`,
  styleUrls: ['./sensor-graphs.component.scss']
})
export class SensorGraphsComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() selectedDevice: Device;
  multiOptions = [];
  multiUpdateOptions = [];

  timer: any;

  themeSubscription: any;

  constructor(private theme: NbThemeService, private measurementService: MeasurementService,
              private substanceService: SubstanceService, private socket: Socket) {
  }

  getMeasurementData(deviceId) {
    this.measurementService.getLastThreeDayMeasurements(deviceId).subscribe(
      (res) => {
        res.forEach((measurementData) => {
          const data = [];

          measurementData.forEach((measurement) => {
            data.push({
              name: new Date(measurement.createdAt).toString(),
              value: [
                new Date(measurement.createdAt),
                measurement.value,
              ]
            });
          });

          const options = {
            gateId: measurementData[0].gateId,
            substanceId: measurementData[0].substanceId,
            backgroundColor: '#fff',
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
              '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            title: {
              name: `${this.substanceService.getText(measurementData[0].substanceId)} | ${measurementData[0].gateId} |`
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                params = params[0];
                const date = new Date(params.name);
                return ('0' + (date.getDate())).slice(-2) + '-' +
                  ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() +
                  ' ' + ('0' + (date.getHours())).slice(-2) + ':' +
                  ('0' + (date.getMinutes())).slice(-2) + ' = ' + params.value[1];
              },
              axisPointer: {
                animation: false
              }
            },
            xAxis: {
              type: 'time',
              splitLine: {
                show: false
              },
              axisLabel: {
                formatter: function(value){
                  const date = new Date(value);
                  return ('0' + (date.getDate())).slice(-2) + '-' +
                    ('0' + (date.getMonth() + 1)).slice(-2) +
                    ' ' + ('0' + (date.getHours())).slice(-2) + ':' +
                    ('0' + (date.getMinutes())).slice(-2);
                }
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
      }, (err) => {
        console.log(err);
      });

    this.socket.on(`device/` + deviceId + '/measurement', (newMeasurement) => {
      let index = 0;
      this.multiOptions.forEach((options) => {
        if (options.gateId === newMeasurement.gateId) {
          let data = options.series[0].data;

          data.unshift({
            name: new Date(newMeasurement.createdAt).toString(),
            value: [
              new Date(newMeasurement.createdAt),
              newMeasurement.value,
            ]
          });

          this.multiUpdateOptions[index] = {
            series: [{
              data
            }]
          }
        }
        index++;
      });
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

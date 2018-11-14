import {Component, AfterViewInit, OnDestroy, Input} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {now} from "moment";

@Component({
  selector: 'ngx-temperature-graph',
  template: `<div echarts [options]="options" class="echart"></div>`,
})
export class TemperatureGraphComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  @Input() data: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      console.log(this.data);

      let temperatures = [];
      let dates = [];
      let dataFormatted = []

      for (let i = 0; i < this.data.length - 1; i++) {
        let date = new Date(this.data[i].createdAt);
        temperatures.push(this.data[i].values['Temperature']);
        dates.push(date);

        let name = date.toString();
        let value = [
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/'),
          this.data[i].values['Temperature']
        ];

        console.log(`name: ${name}`);
        console.log(`value: ${value}`);

        dataFormatted.push({
          name: name,
          value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/'),
            this.data[i].values['Temperature']
          ]
        });
      }

      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;

      this.options = {
        title: {
          text: 'Temperatuur'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
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
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: dataFormatted
        }]
      };

    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  
}

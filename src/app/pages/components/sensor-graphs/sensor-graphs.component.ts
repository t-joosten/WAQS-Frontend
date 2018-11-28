import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { init, ECharts, EChartOption } from 'echarts';

@Component({
  selector: 'ngx-sensor-graphs',
  template: `
    <div echarts [options]="options" [merge]="updateOptions" class="echart"></div>`,
  styleUrls: ['./sensor-graphs.component.scss']
})
export class SensorGraphsComponent implements AfterViewInit, OnDestroy {
  options: EChartOption = {};
  updateOptions: EChartOption = {};

  timer: any;

  themeSubscription: any;

  data = [];

  oneDay = 24 * 3600 * 1000;
  fiveMinutes = 5 * 60 * 1000;
  oneMonth = 30 * 24 * 3600 * 1000;
  now = new Date(2018, 3, 11);
  value = Math.random() * 4 + 18;

  constructor(private theme: NbThemeService) {
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

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      for (let i = 0; i < 1000; i++) {
        this.data.push(this.randomData());
      }

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        title: {
          text: 'Temperatuur'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            const date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() +
              ' ' + date.getHours() + ':' + date.getMinutes() + ' = ' + params.value[1];
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
          data: this.data
        }],
      };

      this.timer = setInterval(() => {

        for (let i = 0; i < 5; i++) {
          this.data.shift();
          this.data.push(this.randomData());
        }

        this.updateOptions = {
          series: [{
            data: this.data
          }]
        }
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    clearInterval(this.timer);
  }
}

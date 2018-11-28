import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {Device} from '../../../models/device.model';

@Component({
  selector: 'ngx-sensor-values',
  styleUrls: ['./sensor-values.component.scss'],
  template: `
    <div class="row" *ngIf="selectedDevice && lastMeasurementLoaded">
      <div class="col-md-4" *ngFor="let key of objectKeys(lastMeasurement.values)">
        <nb-card>
          <div class="icon-container">
            <div class="icon warning">
              <i class="nb-sunny"></i>
            </div>
          </div>

          <div class="details">
            <div class="title">{{ key }}</div>
            <div class="status">{{lastMeasurement.values[key]}}</div>
          </div>
        </nb-card>
      </div>
    </div>
  `,
})
export class SensorValuesComponent implements OnInit, OnChanges {
  @Input() selectedDevice: Device;
  objectKeys = Object.keys;
  public lastMeasurement: any;
  public lastMeasurementLoaded = false;
  private lastMeasurementSubscription: any;

  constructor(private measurementService: MeasurementService) {
  }

  private getLastMeasurementValue(id) {
    this.lastMeasurementSubscription = this.measurementService.getLastMeasurement(id)
      .subscribe(
        (lastMeasurement) => {
          this.lastMeasurement = lastMeasurement;
          this.lastMeasurementLoaded = true;
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property === 'selectedDevice') {
        this.selectedDevice = changes[property].currentValue;
        this.getLastMeasurementValue(this.selectedDevice._id);
      }
    }
  }

  ngOnInit(): void {
    this.getLastMeasurementValue(this.selectedDevice._id);
  }
}

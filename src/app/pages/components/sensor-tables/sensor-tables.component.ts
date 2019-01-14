import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Device} from "../../../models/device.model";
import {MeasurementService} from "../../../services/measurement/measurement.service";

@Component({
  selector: 'ngx-sensor-tables',
  template: '<table class="table" *ngIf="selectedDevice && lastMeasurementLoaded"><thead><tr><th></th><th>Waarde</th><th>Norm</th></tr></thead><tbody><tr *ngFor="let key of objectKeys(lastMeasurement.values)"><td>{{ key }}</td><td>{{lastMeasurement.values[key]}}</td><td>< 25</td></tr></tbody></table>',
  styleUrls: ['./sensor-tables.component.scss']
})
export class SensorTablesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedDevice: Device;
  lastMeasurementSubscription: any;

  public lastMeasurementLoaded = false;
  public lastMeasurement: any;

  constructor(private measurementService: MeasurementService) {
  }

  private getLastMeasurementValue(id) {
    this.lastMeasurementSubscription = this.measurementService.getLastMeasurements(id)
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

  ngOnInit() {
    this.getLastMeasurementValue(this.selectedDevice._id);
  }

  ngOnDestroy() {
    this.lastMeasurementSubscription.unsubscribe();
  }

}

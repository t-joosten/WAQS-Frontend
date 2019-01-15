import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {Device} from '../../../models/device.model';
import {SubstanceService} from '../../../services/substance/substance.service';

@Component({
  selector: 'ngx-sensor-values',
  styleUrls: ['./sensor-values.component.scss'],
  template: `
    <div class="row" *ngIf="selectedDevice && lastMeasurementsLoaded && lastMeasurements">
      <div class="col-md-4" *ngFor="let measurement of lastMeasurements">
        <nb-card [routerLink]="['/pages/devices/' + selectedDevice._id]">
          <div class="icon-container">
              <img src="{{ substance.getIcon(measurement.substanceId) }}" />
          </div>

          <div class="details">
            <div class="title">{{ substance.getText(measurement.substanceId) }}</div>
            <div class="status">{{ measurement.value}} {{ substance.getType(measurement.substanceId) }}</div>
          </div>
          
          <span class="gate-value">{{ measurement.gateId }}</span>
        </nb-card>
      </div>
    </div>
  `,
})
export class SensorValuesComponent implements OnInit, OnChanges {
  @Input() selectedDevice: Device;
  objectKeys = Object.keys;
  public lastMeasurements: any;
  public lastMeasurementsLoaded = false;
  private lastMeasurementSubscription: any;

  constructor(private measurementService: MeasurementService, public substance: SubstanceService) {
  }

  private getLastMeasurements(id) {
    this.lastMeasurementSubscription = this.measurementService.getLastMeasurements(id)
      .subscribe(
        (lastMeasurements) => {
          this.lastMeasurements = lastMeasurements;
          this.lastMeasurementsLoaded = true;
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property === 'selectedDevice') {
        this.selectedDevice = changes[property].currentValue;
        this.getLastMeasurements(this.selectedDevice._id);
      }
    }
  }

  ngOnInit(): void {
    this.getLastMeasurements(this.selectedDevice._id);
  }
}

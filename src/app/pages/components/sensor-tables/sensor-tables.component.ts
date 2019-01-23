import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Device} from '../../../models/device.model';
import {MeasurementService} from '../../../services/measurement/measurement.service';
import {SubstanceService} from '../../../services/substance/substance.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'ngx-sensor-tables',
  styleUrls: ['./sensor-tables.component.scss'],
  template: `
    <div class="table-responsive">
    <table *ngIf="selectedDevice && lastMeasurementsLoaded && lastMeasurements" class="table table-bordered table-measurement">
      <thead>
      <tr>
        <th>Stofgroep</th>
        <th>Waarde</th>
        <th>Ondergrens</th>
        <th>Bovengrens</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let measurement of lastMeasurements">
        <td><span class="gate-value">{{ measurement.gateId }}</span> {{ substance.getText(measurement.substanceId) }}</td>
        <td>{{ measurement.value}} {{ substance.getType(measurement.substanceId) }}</td>
        <td>{{ substance.getLowerBound(measurement.substanceId) }}</td>
        <td>{{ substance.getUpperBound(measurement.substanceId) }}</td>
      </tr>
      </tbody>
    </table>
    </div>
  `,
})
export class SensorTablesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedDevice: Device;
  objectKeys = Object.keys;
  public lastMeasurements: any;
  public lastMeasurementsLoaded = false;
  private lastMeasurementSubscription: any;

  constructor(private measurementService: MeasurementService, public substance: SubstanceService,
              private socket: Socket ) {
  }

  private getLastMeasurements(id) {
    this.lastMeasurementSubscription = this.measurementService.getLastMeasurements(id)
      .subscribe(
        (lastMeasurements) => {
          this.lastMeasurements = lastMeasurements;
          this.lastMeasurementsLoaded = true;
        });

    this.socket.on(`device/` + id + '/measurement', (newMeasurement) => {
      let found = false;
      this.lastMeasurements.forEach((measurement) => {
        if (measurement.gateId === newMeasurement.gateId) {
          measurement.substanceId = newMeasurement.substanceId;
          measurement.value = newMeasurement.value;
          found = true;
        }
      });

      if (!found)
        this.lastMeasurements.push(newMeasurement);
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

  ngOnDestroy() {
    this.socket.removeListener(`device/` + this.selectedDevice._id);
    this.lastMeasurementSubscription.unsubscribe();
  }

}

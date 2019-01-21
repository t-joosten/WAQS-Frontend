import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from 'environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getMeasurements(deviceId): Observable<any> {
    return this.http.get(`${API_URL}/measurements/${deviceId}`);
  }

  public getLastMeasurements(deviceId): Observable<any> {
    return this.http.get(`${API_URL}/measurements/${deviceId}/last`);
  }

  public getLastThreeDayMeasurements(deviceId): Observable<any> {
    return this.http.get(`${API_URL}/measurements/${deviceId}/three-days`);
  }

  public getExport(deviceId): Observable<any> {
    return this.http.get(`${API_URL}/measurements/${deviceId}/export`);
  }

  /*private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }*/
}

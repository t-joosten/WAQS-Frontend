import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getAllDevices(): Observable<any> {
    return this.http.get(API_URL + '/devices');
  }

  public getDevice(deviceId): Observable<any> {
    return this.http.get(`${API_URL}/devices/${deviceId}`);
  }

  /*private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }*/
}

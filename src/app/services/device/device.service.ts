import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import {NbAuthJWTToken, NbAuthService, NbTokenService} from "@nebular/auth";

const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class DeviceService {
  private token = null;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.toString().replace("JWT ", "");
        } else {
          this.token = null;
        }
      });
  }

  public getAllDevices(): Observable<any> {
    return this.http.get(API_URL + '/devices');
  }

  public getDevice(deviceId): Observable<any> {
    return this.http.get(`${API_URL}/devices/${deviceId}`);
  }

  public updateDevice(device): Observable<any> {
    const headers = new HttpHeaders().set("x-access-token", this.token);
    return this.http.put(`${API_URL}/devices/${device.id}`, device, {headers});
  }

  public deleteDevice(deviceId): Observable<any> {
    const headers = new HttpHeaders().set("x-access-token", this.token);
    return this.http.delete(`${API_URL}/devices/${deviceId}`, {headers})
  }

  /*private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }*/
}

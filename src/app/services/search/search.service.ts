import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class SearchService {
  private token = null;

  constructor(private http: HttpClient) {
  }

  public getSearchResults(queryString : string): Observable<any> {
    //const headers = new HttpHeaders().set("x-access-token", this.token);
    return this.http.get(API_URL + '/search/' + queryString);
  }
}

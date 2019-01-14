import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubstanceService {
  private substances: any;

  constructor(private http: HttpClient) {
    this.substances = [
      {
        id: 1,
        text: 'Temperatuur',
        type: 'Celsius',
        lowerBound: 0,
        upperBound: 25,
        icon: 'assets/images/substances/1.jpg'
      },
      {
        id: 2,
        text: 'pH',
        type: 'pH',
        lowerBound: 6.8,
        upperBound: 7.8,
        icon: 'assets/images/substances/2.jpg'
      },
      {
        id: 3,
        text: 'Zuurstof',
        type: 'mg O2',
        lowerBound: 4,
        upperBound: 6,
        icon: 'assets/images/substances/3.jpg'
      },
      {
        id: 4,
        text: 'Fosfaat',
        type: 'mgP/l',
        lowerBound: 0.07,
        upperBound: 0.14,
        icon: 'assets/images/substances/4.jpg'
      },
      {
        id: 5,
        text: 'Ammonium',
        type: 'mg',
        lowerBound: 0,
        upperBound: 0.0082,
        icon: 'assets/images/substances/5.jpg'
      },
      {
        id: 6,
        text: 'Waterpeil',
        type: 'Meter',
        lowerBound: 0,
        upperBound: 0,
        icon: 'assets/images/substances/6.jpg'
      },
      {
        id: 7,
        text: 'Stikstof',
        type: 'mg N/l',
        lowerBound: 1.13,
        upperBound: 2.8,
        icon: 'assets/images/substances/7.jpg'
      },
      {
        id: 8,
        text: 'Deining',
        type: '',
        lowerBound: 0,
        upperBound: 0,
        icon: 'assets/images/substances/8.jpg'
      },
      {
        id: 9,
        text: 'Geleiding',
        type: 'µS/cm',
        lowerBound: '0',
        upperBound: '2999',
        icon: 'assets/images/substances/9.jpg'
      },
      {
        id: 10,
        text: 'Blauwalg',
        type: '',
        lowerBound: 0,
        upperBound: 0,
        icon: 'assets/images/substances/10.jpg'
      },
      {
        id: 11,
        text: 'Licht',
        type: '',
        lowerBound: 0,
        upperBound: 0,
        icon: 'assets/images/substances/11.jpg'
      },
      {
        id: 12,
        text: 'Fosfor',
        type: 'mg P/l',
        lowerBound: 0.042,
        upperBound: 0,
        icon: 'assets/images/substances/12.jpg'
      },
      {
        id: 13,
        text: 'Stroming',
        type: 'm3/s',
        lowerBound: 0,
        upperBound: 0,
        icon: 'assets/images/substances/14.jpg'
      },
    ];
  }

  public getText(id) {
    return this.substances.find(x => x.id === id).text;
  }

  public getType(id) {
    return this.substances.find(x => x.id === id).type;
  }

  public getLowerBound(id) {
    return this.substances.find(x => x.id === id).lowerBound;
  }

  public getUpperBound(id) {
    return this.substances.find(x => x.id === id).upperBound;
  }

  public getIcon(id) {
    return this.substances.find(x => x.id === id).icon;
  }

  public getSubstanceById(id) {
    return this.substances.find(x => x.id === id);
  }

  /*private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }*/
}

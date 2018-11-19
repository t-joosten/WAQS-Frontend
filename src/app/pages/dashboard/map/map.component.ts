import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Device} from '../../../models/device.model';

@Component({
  selector: 'ngx-map',
  template: '<div #gmap style="width:100%;height:600px;border-radius:5px"></div>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  @Output() onSelectDevice = new EventEmitter<Device>();
  selectedDevice: Device;

  @Input() devices: Device[];

  selectDevice(device: Device) {
    this.onSelectDevice.emit(device);
  }

  constructor() {
  }

  ngOnInit() {
    this.initializeMap();
    this.initializeDeviceMarkers(this.devices);
  }

  initializeMap = () => {
    const mapProp = {
      center: new google.maps.LatLng(51.695220, 5.303251),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  createDeviceMarker = (device) => {
    const marker = new google.maps.Marker({
      map: this.map,
      position: {lat: 51.7076474, lng: 5.2801534},
      icon: {
        strokeColor: '#000',
        strokeOpacity: 0.4,
        strokeWeight: 0,
        fillColor: '#FF0000',
        fillOpacity: 0.4,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 13,
        anchor: new google.maps.Point(0, 0)
      },
      zIndex: 10000
    });

    marker.addListener('click', () => {
      this.selectedDevice = device;
      this.selectDevice(this.selectedDevice);
      console.log(this.selectedDevice);
    });
  }

  initializeDeviceMarkers(devices) {
    for (let i = 0; i < 2 /*devices.length*/; i++) {
      this.createDeviceMarker(devices[i]);
    }
  }
}

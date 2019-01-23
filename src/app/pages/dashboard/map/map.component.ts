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
      position: {lat: device.lat, lng: device.long},
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

    const deviceName = device.name !== undefined ? device.name : device.devId;
    const latitude = device.lat !== undefined ? device.lat : 0;
    const longitude = device.long !== undefined ? device.long : 0;

    const contentString = `` +
      `<div class="text-left" style="padding-right: 15px;">` +
      `<h5><a href="/#/pages/devices/${device._id}">${deviceName}</a></h5>` +
      `<p>Latitude: ${latitude}</p>` +
      `<p>Longitude: ${longitude}</p>` +
      `</div>`;

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', () => {
      this.selectedDevice = device;
      this.selectDevice(this.selectedDevice);

      infowindow.open(this.map, marker);
    });
  }

  initializeDeviceMarkers(devices) {
    devices.forEach((device) => {
      this.createDeviceMarker(device);
    });
  }
}

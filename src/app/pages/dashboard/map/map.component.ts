import {Component, OnInit, ViewChild} from '@angular/core';
import {DeviceService} from "../../../services/device/device.service";

@Component({
  selector: 'ngx-map',
  template: '<div #gmap style="width:100%;height:600px;border-radius:5px"></div>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.initializeMap();

    this.deviceService.getAllDevices().subscribe((devices) => {
      this.initializeDeviceMarkers(devices);
    }, (err) => {
      console.log('Devices could not be retrieved');
    });
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
  }

  initializeDeviceMarkers(devices) {
    for (let i = 0; i < devices.length; i++) {
      this.createDeviceMarker(devices[i]);
    }
  }
}

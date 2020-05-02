import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { LocationData } from './../types/article.model';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit, AfterViewInit {

  @Input() locations: LocationData[];

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  mapOptions: any;
  markers: any[] = [];

  lat: any;
  lng: any;
  coordinates: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.coordinates = new google.maps.LatLng(51.49506473014368, 10.349121093749998);

    this.mapOptions  = {
      center: this.coordinates,
      zoom: 5,
      disableDefaultUI: true
    };

    if (this.locations) {
      const customicon = {
        url: '../../assets/images/Logo.png', // url
        scaledSize: new google.maps.Size(40, 40), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
    };
      this.lat = this.locations[0].lat;
      this.lng = this.locations[0].lng;

      this.coordinates = new google.maps.LatLng(this.lat, this.lng);

      this.mapOptions  = {
        center: this.coordinates,
        zoom: 5,
        disableDefaultUI: true
      };

      this.locations.forEach(loc => {

        const lat = loc.lat;
        const lng = loc.lng;
        const coordinates = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.Marker({
          position: coordinates,
          icon: customicon,
          map: this.map,
          title: loc.name
        });
        this.markers.push(marker);
      });
    }
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    if (this.markers) {
      this.markers.forEach(marker => {
        marker.setMap(this.map);
      });
    }
  }

}

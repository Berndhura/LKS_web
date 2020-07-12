import { LocationService } from './../services/location.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { LocationData } from './../types/article.model';
import {firebaseImageUrl} from './../configs/config';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit, AfterViewInit {

  @Input() locations: string[];

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  mapOptions: any;
  markers: any[] = [];

  lat: any;
  lng: any;
  coordinates: any;

  firebaseImageUrl = firebaseImageUrl;

  constructor(private locationService: LocationService) { }

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
        url: firebaseImageUrl + 'o/app%2Flogo%2FLogo.png?alt=media&token=d76b35a5-f3c5-4d45-9554-28c0909ce5e7', // url
        scaledSize: new google.maps.Size(40, 40), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
    };

      this.locationService.getLocationByCity(this.locations[0], locationData => {
        this.lat = locationData.lat;
        this.lng = locationData.lng;

        this.coordinates = new google.maps.LatLng(this.lat, this.lng);

        this.mapOptions  = {
          center: this.coordinates,
          zoom: 5,
          disableDefaultUI: true
        };

        this.locations.forEach(loc => {

          this.locationService.getLocationByCity(loc, locData => {
            const lat = locData.lat;
            const lng = locData.lng;
            const coordinates = new google.maps.LatLng(lat, lng);
            const marker = new google.maps.Marker({
              position: coordinates,
              icon: customicon,
              map: this.map,
              title: locData.name
            });
            this.markers.push(marker);
          });
        });
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

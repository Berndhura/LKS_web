import { LocationData } from './../types/article.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require: any;
const ipLocation = require('../../../node_modules/iplocation');

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  geocoder = new google.maps.Geocoder();

  constructor(private httpClient: HttpClient) { }

  async getLocationByIp(fn) {
    const ip: any = await this.httpClient.get('http://api.ipify.org/?format=json').toPromise();
    const ipLoc = await ipLocation(ip.ip);
    this.getLocationByCity(ipLoc.city, fn);


    // navigator.geolocation.getCurrentPosition(position => {
    //   const latlng = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   };

    //   this.geocoder.geocode({location: latlng}, results => {
    //     console.log(results);
    //    });
    // });

  }

  getGeodata(locations: string[]): LocationData[] {
    const locationsGeodata: LocationData[] = [];
    locations.forEach(location => {
      this.getLocationByCity(location, locationData => {
        locationsGeodata.push(locationData);
      });
    });
    return locationsGeodata;
  }

  getLocationByCity(city: string, fn) {
    this.geocoder.geocode({address: city}, l => {
      const locationFinal: LocationData = {name: city, lat: l[0].geometry.location.lat(), lng: l[0].geometry.location.lng()};
      fn(locationFinal);
    });
  }
}

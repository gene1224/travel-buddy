import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from '../_interfaces/location';
import {
  API_KEY,
  GOOGLE_API,
  DISTANCE_API,
  DETAILS_API,
  GOOGLE_PHOTOS_API,
  API_KEY_2
} from '../_constants/config.constants';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressUtilService {
  private places_api = 'http://localhost/api/places.php';
  constructor(private http: HttpClient) {}

  getAddress(point) {
    const requestUrl = `${GOOGLE_API}/geocode/json?latlng=${point.coords.latitude},${
      point.coords.longitude
    }&key=${API_KEY}`;
    return this.http.get(requestUrl).pipe(
      map(res => {
        return res;
      })
    );
  }

  getPreloadedJson() {
    return this.http.get('http://localhost/test_data.json').pipe(
      map(response => {
        return response;
      })
    );
  }

  getDistance(origin, destination) {
    const o = `${origin.lat},${origin.lng}`;
    const d = `${destination.lat},${destination.lng}`;
    return this.http.get(DISTANCE_API(o, d)).pipe(
      map(res => {
        console.log(res);
        return res['rows'][0]['elements'][0];
      })
    );
  }

  getDetails(placeId) {
    return this.http.get(DETAILS_API(placeId)).pipe(
      map(result => {
        return result;
      })
    );
  }

  nearbyPlaces(coor) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      coor.lat
    },${coor.lng}&radius=2000`;
    return this.http.get(`${url}&key=${API_KEY}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  preparePhotoSource(data) {
    if (data.photos && data.photos[0]) {
      const s = `${GOOGLE_PHOTOS_API}${data.photos[0].photo_reference}&key=${API_KEY_2}`;
      return s;
    }
  }

  joinArray(arr: any[]) {
    return arr
      .map(x => {
        return x.split('_').join(' ');
      })
      .join(', ');
  }

  adminGetPlaces() {
    return this.http.get(`${this.places_api}?places=1`).pipe(
      map(result => {
        return result;
      })
    );
  }

  updateLocation(c) {
    return this.http.post(`${this.places_api}?add=1`, c).pipe(
      map(result => {
        return result;
      })
    );
  }
  deleteLoc(c) {
    return this.http.post(`${this.places_api}?deleteLoc=1`, c).pipe(
      map(result => {
        return result;
      })
    );
  }
}

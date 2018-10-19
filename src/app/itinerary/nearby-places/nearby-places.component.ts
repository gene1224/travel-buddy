import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddressUtilService } from 'src/app/_services/address-util.service';
import {
  INVALID_TYPES,
  FOOD_TYPE,
  HOTEL_TYPE
} from 'src/app/_constants/location.constants';

@Component({
  selector: 'app-nearby-places',
  templateUrl: './nearby-places.component.html',
  styleUrls: ['./nearby-places.component.scss']
})
export class NearbyPlacesComponent implements OnInit {
  @Input()
  location;
  @Input()
  origin;
  dataLocations: any = [];
  @Output()
  notify: EventEmitter<any> = new EventEmitter<any>();
  oldData: any = [];

  showNearbyPlaces = false;
  hotels: any = [];
  restaurants: any = [];
  constructor(public _addressUtilService: AddressUtilService) {}

  ngOnInit() {}

  addLocation(data) {
    this.notify.emit(data);
  }
  showPlaces() {
    if (this.dataLocations.length !== 0) {
      this.showNearbyPlaces = !this.showNearbyPlaces;
      return;
    }
    this._addressUtilService.nearbyPlaces(this.location).subscribe(res => {
      this.dataLocations = res['results'].filter(
        location => !location.types.some(type => INVALID_TYPES.includes(type))
      );
      this.oldData = this.dataLocations;
      this.restaurants = this.oldData.filter(location =>
        location.types.some(type => FOOD_TYPE.includes(type))
      );
      this.hotels = this.oldData.filter(location =>
        location.types.some(type => HOTEL_TYPE.includes(type))
      );
      

      this.showNearbyPlaces = !this.showNearbyPlaces;
    });
  }

  showFoods() {
    this.dataLocations = this.restaurants;
  }

  showHotels() {
    this.dataLocations = this.hotels;
  }
}

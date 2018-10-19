import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Subject } from 'rxjs';
import { AddressUtilService } from '../../../_services/address-util.service';
import { API_KEY_2, GOOGLE_PHOTOS_API } from '../../../_constants/config.constants';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FOOD_TYPE,
  HOTEL_TYPE,
  ESTABLISHMENT_TYPE
} from 'src/app/_constants/location.constants';
@Component({
  selector: 'app-select-location-list',
  templateUrl: './select-location-list.component.html',
  styleUrls: ['./select-location-list.component.scss']
})
export class SelectLocationListComponent implements OnInit {
  dataLocations: any = [];
  unfilteredData: any = [];
  searchQuery = '';
  hotels: any = [];
  establishment: any = [];
  restaurants: any = [];
  onClose: Subject<boolean>;
  constructor(
    public bsModalRef: BsModalRef,
    private _addressUtil: AddressUtilService,
    private sanitization: DomSanitizer
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this._addressUtil.getPreloadedJson().subscribe(response => {
      this.dataLocations = response;
      this.unfilteredData = response;
      this.restaurants = this.unfilteredData.filter(location =>
        location.types.some(type => FOOD_TYPE.includes(type))
      );
      this.hotels = this.unfilteredData.filter(location =>
        location.types.some(type => HOTEL_TYPE.includes(type))
      );
      this.hotels = this.unfilteredData.filter(location =>
        location.types.some(type => HOTEL_TYPE.includes(type))
      );
      this.establishment = this.unfilteredData.filter(location =>
        location.types.some(type => ESTABLISHMENT_TYPE.includes(type))
      );
    });
  }

  joinArray(arr: any[]) {
    return arr
      .map(x => {
        return x.split('_').join(' ');
      })
      .join(', ');
  }

  onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  preparePhotoSource(data) {
    if (data.photos && data.photos[0]) {
      const s = `${GOOGLE_PHOTOS_API}${data.photos[0].photo_reference}&key=${API_KEY_2}`;
      return s;
    }
  }

  addLocation(data) {
    this.onClose.next(data);
    this.bsModalRef.hide();
  }
  searchPlace() {
    this.dataLocations = this.unfilteredData.filter(
      place =>
        place.name.toLowerCase().indexOf(this.searchQuery.toLocaleLowerCase()) !== -1
    );
  }
}

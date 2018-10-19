import { AgmMarker } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SelectLocationListComponent } from '../../layout/modals/select-location-list/select-location-list.component';
import { DAVAO_CITY } from '../../_constants/location.constants';
import { samplelocations } from '../../_constants/sample-data.constants';
import { Coordinates, Place } from '../../_interfaces/location';
import { ItineraryService } from '../../_services/itinerary.service';
import {
  GOOGLE_PHOTOS_API,
  API_KEY_2,
  PHOTO_API
} from '../../_constants/config.constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-itinerary',
  templateUrl: './view-itinerary.component.html',
  styleUrls: ['./view-itinerary.component.scss']
})
export class ViewItineraryComponent implements OnInit {
  tester: AgmMarker;
  public PHOTO_API = PHOTO_API;
  public mapCenter: Coordinates = DAVAO_CITY;
  public sampleData: any = {};
  public places = [];
  public title = '';
  public notes = '';
  no_of_days = 1;
  public waypoints: any = [];
  public locationx: any = [];
  public renderOptions = {
    draggable: false,
    suppressMarkers: true
  };
  options: any;
  constructor(
    private _ItineraryService: ItineraryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params.uid) {
        this.loadData(params.uid);
      }
    });
  }

  loadData(id) {
    this._ItineraryService.viewItinerary(id).subscribe(res => {
      if (res && res['locations']) {
        this.locationx = res['locations'];
        this.title = res['title'];
        this.no_of_days = res['no_of_days'];
        this.notes = res['notes'];
        this.getDirection();
      }
    });
  }

  joinArray(arr: any[]) {
    return arr
      .map(x => {
        return x.split('_').join(' ');
      })
      .join(', ');
  }

  getDirection() {
    this.places = this.locationx.map(loc => loc.geometry.location);
  }

  preparePhotoSource(data) {
    if (data.photos && data.photos[0]) {
      const s = `${GOOGLE_PHOTOS_API}${data.photos[0].photo_reference}&key=${API_KEY_2}`;
      return s;
    }
  }

  printPage() {
    window.print();
  }
}



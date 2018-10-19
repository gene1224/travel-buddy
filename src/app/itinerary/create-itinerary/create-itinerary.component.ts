import { AgmMarker } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SelectLocationListComponent } from '../../layout/modals/select-location-list/select-location-list.component';
import { DAVAO_CITY } from '../../_constants/location.constants';
import { samplelocations } from '../../_constants/sample-data.constants';
import { Coordinates, Place } from '../../_interfaces/location';
import {
  PHOTO_API,
  GOOGLE_PHOTOS_API,
  API_KEY_2
} from '../../_constants/config.constants';
import { ItineraryService } from '../../_services/itinerary.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.scss']
})
export class CreateItineraryComponent implements OnInit {
  bsModalRef: BsModalRef;
  @ViewChild('doneSwal')
  doneSwal: SwalComponent;
  @ViewChild('tester')
  tester: AgmMarker;
  @ViewChild('duplicateSwal')
  duplicateSwal: SwalComponent;

  public primaryId = -1;
  public addnotes = false;
  public PHOTO_API = PHOTO_API;
  public mapCenter: Coordinates = DAVAO_CITY;
  public sampleData: any = {};
  public places = [];
  public title = '';
  public email = '';
  public notes = '';
  public no_of_days = 1;
  public waypoints: any = [];
  public locationx: any = [];
  public isPublic = 1;
  public userId: any = -1;
  public renderOptions = {
    draggable: false,
    suppressMarkers: true
  };
  options: any;
  isLoggedIn = false;
  constructor(
    private modalService: BsModalService,
    private _itineraryService: ItineraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.options = {
      onUpdate: (event: any) => {
        this.getDirection();
      }
    };
  }

  ngOnInit() {
    this.userId = localStorage.getItem('id') || -1;
    this.email = localStorage.getItem('email');
    if (this.userId) {
      this.isLoggedIn = true;
    }

    this.route.params.subscribe(params => {
      if (params && params.uid) {
        this.loadData(params.uid);
      }
    });
  }

  loadData(id) {
    this._itineraryService.viewItinerary(id).subscribe(res => {
      if (res && res['locations']) {
        this.primaryId = res['id'];
        debugger
        this.locationx = res['locations'];
        this.title = res['title'];
        this.no_of_days = res['no_of_days'];
        this.notes = res['notes'];
        this.email = this.router.url.split('/').includes('copy') ? '' : res['email'];
        this.getDirection();
      }
    });
  }

  getDirection() {
    this.places = this.locationx.map(loc => loc.geometry.location);
  }

  openLocationListModal() {
    const initialState = {};
    this.bsModalRef = this.modalService.show(SelectLocationListComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        const checkLocation = obj => obj.name === result.name;
        if (this.locationx.some(checkLocation)) {
          alert('exist');
        } else {
          this.locationx.push(result);
          console.log(this.locationx);
          this.getDirection();
        }
      }
    });
  }

  additionalPlace(data) {
    if (data) {
      const checkLocation = obj => obj.name === data.name;
      if (this.locationx.some(checkLocation)) {
        alert('exist');
      } else {
        this.locationx.push(data);
        console.log(this.locationx);
        this.getDirection();
      }
    }
  }

  removeLocation(place_id) {
    console.log(this.locationx);
    this.locationx = this.locationx.filter(function(location) {
      return location.place_id !== place_id;
    });
    this.getDirection();
  }

  joinArray(arr: any[]) {
    return arr
      .map(x => {
        return x.split('_').join(' ');
      })
      .join(', ');
  }

  saveItinerary() {
    const itinerary = {
      title: this.title || '',
      notes: this.notes || '',
      email: this.email || '',
      private: this.isPublic,
      locations: this.locationx,
      user_id: this.userId,
        id: this.userId !== -1 ? this.primaryId : -1;
    };
      debugger
      if (this.primaryId === -1) {
          this._itineraryService.addItinerary(itinerary).subscribe(response => {
              if (response['done']) {
                  this.doneSwal.show().then(res => {
                      location.href = `#/itinerary/view/${response['done']}`;
                  });
              }
          });
        } else {
          debugger
          this._itineraryService.editItinerary(itinerary).subscribe(response => {
              if (response['done']) {
                  this.doneSwal.show().then(res => {
                      location.href = `#/itinerary/view/${response['done']}`;
                  });
              }
          });
        }
  }

  preparePhotoSource(data) {
    if (data.photos && data.photos[0]) {
      const s = `${GOOGLE_PHOTOS_API}${data.photos[0].photo_reference}&key=${API_KEY_2}`;
      return s;
    }
  }
  iconLocator(icon) {
    let iconUrl = 'assets/garden.png';
    switch (icon) {
      case 'zoo':
        iconUrl = 'assets/garden.png';
        break;
      case 'park':
        iconUrl = 'assets/garden.png';
        break;
      case 'lodging':
        iconUrl = 'assets/pool.png';
        break;
      case 'point_of_interest':
        iconUrl = 'assets/hotel.png';
        break;
      default:
        iconUrl = 'assets/mall.png';
    }
    return iconUrl;
  }
}

export const itenerary = {
  title: 'time to davao',
  startDate: 'date1',
  endDate: 'date1',
  places: samplelocations
};

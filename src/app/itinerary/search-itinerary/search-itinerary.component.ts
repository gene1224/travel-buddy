import { Component, OnInit, ViewChild } from '@angular/core';
import { ItineraryService } from '../../_services/itinerary.service';
import { GOOGLE_PHOTOS_API, API_KEY_2 } from 'src/app/_constants/config.constants';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-search-itinerary',
  templateUrl: './search-itinerary.component.html',
  styleUrls: ['./search-itinerary.component.scss']
})
export class SearchItineraryComponent implements OnInit {
  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  public itineraries: any = [];
  selected = [];
  itemViewed: any = [];
  columns = [
    { prop: 'title', name: 'Itinerary Title' },
    { prop: 'notes', name: 'Itineray Notes' }
  ];
  defaultContent: any = [];
  constructor(private _itineraryService: ItineraryService) {}

  ngOnInit() {
    this._itineraryService.getAllItinerary().subscribe(res => {
      this.itineraries = res;
      this.defaultContent = res;
    });
  }

  onSelectUser({ selected }) {
    this.itemViewed = selected[0];
    console.log(this.itemViewed);
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    this.itineraries = this.defaultContent.filter(data => {
      return data.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (val.length === 0) {
      this.table.offset = 0;
      return (this.itineraries = this.defaultContent);
    }
    this.table.offset = 0;
  }
}

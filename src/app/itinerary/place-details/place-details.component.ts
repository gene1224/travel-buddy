import { Component, OnInit, Input } from '@angular/core';
import { AddressUtilService } from '../../_services/address-util.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  @Input()
  placeId;
  details: any;
  isCollapsed = true;
  constructor(private _addressUtil: AddressUtilService) {}

  ngOnInit() {}
  showDetails() {
    if (this.isCollapsed) {
      this.loadDetails();
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }
  loadDetails() {
    this._addressUtil.getDetails(this.placeId).subscribe(result => {
      this.details = result;
    });
  }
}

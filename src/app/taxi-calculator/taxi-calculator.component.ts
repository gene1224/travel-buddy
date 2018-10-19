import { Component, OnInit, Input } from '@angular/core';
import { AddressUtilService } from '../_services/address-util.service';

@Component({
  selector: 'app-taxi-calculator',
  templateUrl: './taxi-calculator.component.html',
  styleUrls: ['./taxi-calculator.component.scss']
})
export class TaxiCalculatorComponent implements OnInit {
  @Input()
  origin;
  @Input()
  destination;
  @Input()
  fromText;
  distance: string;

  distanceDetails: any;
  constructor(private _addrssUtil: AddressUtilService) {}

  ngOnInit() {
    this._addrssUtil.getDistance(this.origin, this.destination).subscribe(result => {
      this.distance = result.distance.text;
      this.distanceDetails = result;
    });
  }

  computeFare() {
    const checkDuration =
      this.distanceDetails &&
      this.distanceDetails.duration &&
      this.distanceDetails.duration.value;
    const checkDistance =
      this.distanceDetails &&
      this.distanceDetails.distance &&
      this.distanceDetails.distance.value;
        
    const time = checkDuration ? this.distanceDetails.duration.value / 3600 : 0;
    const timePrice = time * 120;
    const km = checkDistance ? this.distanceDetails.distance.value / 1000 : 0;
    const kmPrice = km * 13.25;
    return 40 + timePrice + kmPrice;
  }
}

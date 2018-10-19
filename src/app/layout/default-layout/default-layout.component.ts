import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressUtilService } from '../../_services/address-util.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private addresUtil: AddressUtilService) {}
  @ViewChild('doneSwall')
  doneSwall: SwalComponent;
  ngOnInit() {}

  checkLoggedIn() {
    return localStorage.getItem('id') ? true : false;
  }
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.addresUtil.getAddress(position).subscribe(res => {
          this.doneSwall.text = res['results'][0]['formatted_address'];
          this.doneSwall.show();
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}

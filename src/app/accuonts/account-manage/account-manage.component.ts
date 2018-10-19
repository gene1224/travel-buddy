import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { ItineraryService } from 'src/app/_services/itinerary.service';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.css']
})
export class AccountManageComponent implements OnInit {
  @ViewChild('doneSwal')
  doneSwal: SwalComponent;
  @ViewChild('invalidPassword')
  invalidPassword: SwalComponent;
  @ViewChild('deleteSwal')
  deleteSwal: SwalComponent;

  cpassword;
  email;
  first_name;
  last_name;
  password;
  updateDetails;
  updatePassword;
  oldpassword;
  id;
  itineraries;
  constructor(
    private _accountsService: AccountsService,
    private _itineraryService: ItineraryService
  ) {}

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.first_name = localStorage.getItem('first_name');
    this.last_name = localStorage.getItem('last_name');
    this.getItinerary();
  }
  getItinerary() {
    return this._itineraryService
      .getAllItinerary(localStorage.getItem('id'))
      .subscribe(res => {
        this.itineraries = res;
      });
  }

  updateUser() {
    const data = {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      id: this.id
    };
    this._accountsService.update(data).subscribe(res => {
      if (res && res['error'] !== 1) {
        localStorage.setItem('id', res['id']);
        localStorage.setItem('email', res['email']);
        localStorage.setItem('first_name', res['first_name']);
        localStorage.setItem('last_name', res['last_name']);
        this.doneSwal.show();
      } else {
      }
    });
  }

  updatePass() {
    if (this.cpassword !== this.password) {
      this.invalidPassword.show();
      return;
    }
    const data = {
      cpassword: this.cpassword,
      password: this.password,
      oldpassword: this.oldpassword,
      id: this.id
    };

    this._accountsService.updatePassword(data).subscribe(res => {
      if (res && res['error'] !== 1) {
        this.cpassword = '';
        this.password = '';
        this.oldpassword = '';
        this.doneSwal.show();
      }
    });
  }

  deleteItinerary(id) {
    this.deleteSwal.show().then(res => {
      if (res.value) {
        this._itineraryService.delete(id).subscribe(result => {
          return this.doneSwal.show().then(resp => {
            this.getItinerary();
          });
        });
      }
    });
  }
}

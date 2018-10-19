import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressUtilService } from '../_services/address-util.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountsService } from '../_services/accounts.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(DatatableComponent)
  table: DatatableComponent;
  @ViewChild(DatatableComponent)
  tableUsers: DatatableComponent;
  @ViewChild('doneSwal')
  doneSwal: SwalComponent;
  @ViewChild('invalidPass')
  invalidPass: SwalComponent;

  selected = [];
  dataSelected: any = {};
  userSelected = [];
  userSelect = [];
  places: any = [];
  placesDefault: any = [];
  users: any = [];
  usersDefault: any = [];
  columns = [
    { prop: 'first_name', name: 'First Name' },
    { prop: 'last_name', name: 'Last Name' },
    { prop: 'email', name: 'Email' }
  ];
  constructor(
    private _adminUtil: AddressUtilService,
    private _accountService: AccountsService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('isAdmin') !== '1') {
      location.href = '/login';
    }
    this._adminUtil.adminGetPlaces().subscribe(res => {
      this.places = res;
      this.placesDefault = res;
    });
    this.getUsers();
  }

  getUsers() {
    this._accountService.adminGetUser().subscribe(res => {
      this.users = res;
      this.table.offset = 0;
      this.usersDefault = res;
    });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    this.places = this.placesDefault.filter(data => {
      return data.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (val.length === 0) {
      this.table.offset = 0;
      return (this.places = this.placesDefault);
    }
    this.table.offset = 0;
  }
  onSelect({ selected }) {
    this.dataSelected = selected[0];
  }
  onSelectUser({ selected }) {
    this.userSelected = selected[0];
  }

  updateUserFilter(event) {
    const val = event.target.value.toLowerCase();

    this.users = this.users.filter(data => {
      const name = `${data.first_name} ${data.last_name}`;
      return name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (val.length === 0) {
      this.table.offset = 0;
      return (this.users = this.usersDefault);
    }
    this.table.offset = 0;
  }

  sendLocation(data) {
    this._adminUtil.updateLocation(data).subscribe(res => {
      this.doneSwal.show().then(resa => {
        this._adminUtil.adminGetPlaces().subscribe(repb => {
          this.places = repb;
          this.placesDefault = repb;
          this.table.offset = 0;
        });
      });
    });
  }

  deleteLocation(data) {
    this._adminUtil.deleteLoc(data).subscribe(res => {
      this.doneSwal.show().then(resa => {
        this._adminUtil.adminGetPlaces().subscribe(repb => {
          this.places = repb;
          this.placesDefault = repb;
          this.table.offset = 0;
        });
      });
    });
  }

  sendUser(data) {
    this._accountService.update(data).subscribe(res => {
      this.doneSwal.show().then(resa => {
        this.getUsers();
      });
    });
  }

  deleteUser(data) {
    this._accountService.deleteUser(data).subscribe(res => {
      this.doneSwal.show().then(resa => {
        this.getUsers();
      });
    });
  }

  editPassword(data) {
    if (data.npassword !== data.cpassword) {
        return this.invalidPass.show();
    }
    this._accountService.update(data).subscribe(res => {
      this.doneSwal.show().then(resa => {
        this.getUsers();
      });
    });
  }
}

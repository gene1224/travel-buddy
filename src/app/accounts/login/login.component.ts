import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { AccountsService } from '../../_services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: String = '';
  @ViewChild('badLoginSwal')
  badLoginSwal: SwalComponent;
  public password: String = '';
  constructor(private _accountService: AccountsService) {}

  ngOnInit() {
    if (localStorage.getItem('id')) {
      location.href = '/';
    }
  }
  login() {
    this._accountService
      .login({ email: this.email, password: this.password })
      .subscribe(res => {
        if (res && res['error'] !== 1) {
          localStorage.setItem('id', res['id']);
          localStorage.setItem('email', res['email']);
          localStorage.setItem('first_name', res['first_name']);
          localStorage.setItem('last_name', res['last_name']);
            localStorage.setItem('isAdmin', res['isAdmin']);
          location.href = '/';
        } else {
          this.badLoginSwal.show();
        }
      });
  }
}

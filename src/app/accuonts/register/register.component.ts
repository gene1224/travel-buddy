import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from '../../_services/accounts.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('badRegistraion')
  badRegistraion: SwalComponent;
  @ViewChild('doneSwal')
  doneSwal: SwalComponent;

  email = '';
  password = '';
  cpassword = '';
  first_name = '';
  last_name = '';

  constructor(private _accountService: AccountsService) {}

  ngOnInit() {}

  register() {
    const accountDetails = {
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name
    };
    if (this.cpassword !== this.password) {
      this.badRegistraion.title = 'Password Does Not Match';
      this.badRegistraion.show();
    } else {
      this._accountService.register(accountDetails).subscribe(res => {
        if (res['done']) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('first_name', this.first_name);
          localStorage.setItem('last_name', this.last_name);
          localStorage.setItem('id', res['done']);
          this.doneSwal.show().then(res => {
            location.href = '/';
          });
        }
      });
    }
  }
}

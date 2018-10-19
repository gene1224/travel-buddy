import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  API_PATH = 'http://localhost/api/account.php';
  private places_api = 'http://localhost/api/places.php';
  constructor(private http: HttpClient) {}

  login(data) {
    return this.http.post(`${this.API_PATH}?login=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  register(data) {
    return this.http.post(`${this.API_PATH}?register=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  checkLoggedIn() {
    return localStorage.getItem('id') ? true : false;
  }

  update(data) {
    return this.http.post(`${this.API_PATH}?edit=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  updatePassword(data) {
    return this.http.post(`${this.API_PATH}?updatePass=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  adminGetUser() {
    return this.http.get(`${this.places_api}?users=1`).pipe(
      map(result => {
        return result;
      })
    );
  }

  deleteUser(data) {
    return this.http.post(`${this.API_PATH}?deleteUsr=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
}

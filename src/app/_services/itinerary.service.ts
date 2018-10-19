import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  API_PATH = 'http://localhost/api/itinerary.php';
  constructor(private http: HttpClient) {}

  viewItinerary(id) {
    return this.http.get(`${this.API_PATH}?view=1&id=${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  addItinerary(data) {
    return this.http.post(`${this.API_PATH}?add=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  editItinerary(data) {
    return this.http.post(`${this.API_PATH}?edit=1`, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  getAllItinerary(user_id?) {
    const url = user_id
      ? `${this.API_PATH}?all=1&user_id=${user_id}`
      : `${this.API_PATH}?all=1`;

    return this.http.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }
  getMyItinerary(id) {
    return this.http.get(`${this.API_PATH}?uid=${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  delete(id) {
    return this.http.post(`${this.API_PATH}?delete=${1}`, { id: id }).pipe(
      map(response => {
        return response;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl: string = `${environment.apiUrl}/restaurants/`;

  public constructor(private http: HttpClient) { }

  public getRestaurants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public getRestaurant(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  public deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  public saveRestaurant(data: Restaurant): Observable<any> {
    return this.http.put(`${this.apiUrl}${data.id}`, data);
  }

  public createRestaurant(data: Restaurant): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}

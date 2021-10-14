import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl: string = `${environment.apiUrl}/orders/`;

  public constructor(private http: HttpClient) { }

  public getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public getOrder(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  public deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  public saveOrder(data: Order): Observable<any> {
    return this.http.put(`${this.apiUrl}${data.id}`, data);
  }

  public createOrder(data: Order): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}

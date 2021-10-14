import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/models/menu-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private apiUrl: string = `${environment.apiUrl}/menu-items`;

  public constructor(private http: HttpClient) { }

  public getMenuItems(restaurantId: string = ''): Observable<any> {
    return this.http.get(this.apiUrl, { params: { restaurantId } });
  }

  public getMenuItem(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public deleteMenuItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public saveMenuItem(data: MenuItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${data.id}`, data);
  }

  public createMenuItem(data: MenuItem): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}

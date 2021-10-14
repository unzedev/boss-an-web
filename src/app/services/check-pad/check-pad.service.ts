import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckPad } from 'src/app/models/check-pad.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckPadService {

  private apiUrl: string = `${environment.apiUrl}/check-pads`;

  public constructor(private http: HttpClient) { }

  public getCheckPads(restaurantId: string = ''): Observable<any> {
    return this.http.get(this.apiUrl, { params: { restaurantId } });
  }

  public getCheckPad(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public deleteCheckPad(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public saveCheckPad(data: CheckPad): Observable<any> {
    return this.http.put(`${this.apiUrl}/${data.id}`, data);
  }

  public createCheckPad(data: CheckPad): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}

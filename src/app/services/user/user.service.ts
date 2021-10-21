import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = `${environment.apiUrl}/users/`;

  public constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  public saveUser(data: User): Observable<any> {
    return this.http.put(`${this.apiUrl}${data.id}`, data);
  }

  public createUser(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}

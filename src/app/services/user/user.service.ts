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

  // public getUser(id: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}${id}`);
  // }

  public getUserByEmail(email: string): Observable<{ active: boolean, status: string }> {
    return this.http.get<{ active: boolean, status: string }>(`${this.apiUrl}search/${email}`);
  }

  // public deleteUser(id: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}${id}`);
  // }

  public saveUser(data: User): Observable<any> {
    return this.http.put(`${this.apiUrl}${data.id}`, data);
  }

  public createUser(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  public getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}employees`);
  }

  public createEmployee(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}employees`, data);
  }

  public getUserModules(): Observable<any> {
    return this.http.get(`${this.apiUrl}modules`);
  }

  public getUserInvoices(): Observable<any> {
    return this.http.get(`${this.apiUrl}invoices`);
  }

  public getDashboardQueries(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries`);
  }

  public getDashboardQueriesByTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries/types`);
  }
}

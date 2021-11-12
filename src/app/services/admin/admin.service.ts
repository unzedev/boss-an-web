import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserConfig } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl: string = `${environment.apiUrl}/admins/`;

  public constructor(private http: HttpClient) { }

  public createConfig(config: UserConfig): Observable<any> {
    return this.http.post(`${this.apiUrl}config`, config);
  }

  public updateConfig(config: UserConfig): Observable<any> {
    return this.http.put(`${this.apiUrl}config/${config.id}`, config);
  }

  public getUserConfig(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}users/${userId}/config`);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}users`);
  }

  public approveUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}users/${userId}/approval`, {});
  }

  public getQueries(): Observable<any> {
    return this.http.get(`${this.apiUrl}queries`);
  }

  public getDashboardQueries(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries`);
  }

  public getDashboardQueriesByTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries/types`);
  }
}

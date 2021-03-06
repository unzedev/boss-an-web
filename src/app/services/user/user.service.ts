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

  public getUserByEmail(email: string): Observable<{ active: boolean, status: string }> {
    return this.http.get<{ active: boolean, status: string }>(`${this.apiUrl}search/${email}`);
  }

  public saveUser(data: User): Observable<any> {
    return this.http.put(`${this.apiUrl}${data.id}`, data);
  }

  public createUser(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  public getEmployees(pagination: { offset: number, perPage: number }, filter: any): Observable<any> {
    return this.http.get(`${this.apiUrl}employees`, {
      params: filter,
      headers: {
        offset: Number(pagination.offset).toString(),
        per_page: Number(pagination.perPage).toString()
      }
    });
  }

  public createEmployee(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}employees`, data);
  }

  public blockEmployee(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}employees/${id}/block`, { message: `Bloqueado no dia ${new Date}` });
  }

  public unblockEmployee(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}employees/${id}/unblock`, {});
  }

  public saveEmployee(data: User): Observable<any> {
    return this.http.patch(`${this.apiUrl}employees/${data.id}`, data);
  }

  public deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}employees/${id}`, {});
  }

  public getUserModules(): Observable<any> {
    return this.http.get(`${this.apiUrl}modules`);
  }

  public getUserInvoices(pagination: { offset: number, perPage: number }, filter: any): Observable<any> {
    return this.http.get(`${this.apiUrl}invoices`, {
      params: filter,
      headers: {
        offset: Number(pagination.offset).toString(),
        per_page: Number(pagination.perPage).toString()
      }
    });
  }

  public getInvoiceStatement(invoiceId: string, pagination: { offset: number, perPage: number }): Observable<any> {
    return this.http.get(`${this.apiUrl}invoices/${invoiceId}/statement`, {
      headers: {
        offset: Number(pagination.offset).toString(),
        per_page: Number(pagination.perPage).toString()
      }
    });
  }

  public getDashboardQueries(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries`);
  }

  public getDashboardQueriesByTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries/types`);
  }
  public getDashboardQueriesByCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries/count`);
  }

  public getDashboardQueriesByCredit(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries/credit`);
  }

  public getDashboardQueriesByStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}dashboard/queries/status`);
  }

  public getPlans(): Observable<any> {
    return this.http.get(`${this.apiUrl}plans`);
  }

  public getUserPlan(): Observable<any> {
    return this.http.get(`${this.apiUrl}plans/me`);
  }

  public changeUserPlan(planId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}plans/${planId}`, { planId });
  }

  public getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}me`);
  }

  public saveUserInfo(body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}me`, body);
  }
}

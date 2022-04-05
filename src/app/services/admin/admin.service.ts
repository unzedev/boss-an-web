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

  public getUsers(filter: { status?: string, role?: string, active?: string, document?: string, email?: string, name?: string, employer?: string }, pagination: { offset: number, perPage: number }): Observable<any> {
    return this.http.get(`${this.apiUrl}users`, {
      params: filter || null,
      headers: {
        offset: Number(pagination.offset).toString(),
        per_page: Number(pagination.perPage).toString()
      }
    });
  }

  public approveUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}users/${userId}/approval`, {});
  }

  public rejectUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}users/${userId}/disapproval`, {});
  }

  public getQueries(filter: { type?: string, module?: string, user?: string, start_date?: string, end_date?: string, cost?: string }, pagination: { offset: number, perPage: number }): Observable<any> {
    return this.http.get(`${this.apiUrl}queries`, {
      params: filter || null,
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

  public getInvoices(filter: { status?: string, month?: string, year?: string, user?: string }, pagination: { offset: number, perPage: number }): Observable<any> {
    return this.http.get(`${this.apiUrl}invoices`, {
      params: filter,
      headers: {
        offset: Number(pagination.offset).toString(),
        per_page: Number(pagination.perPage).toString()
      }
   });
  }

  public createInvoice(config: { month: number, year: number, user: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}invoices`, config);
  }

  public updateInvoiceStatus(invoiceId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}invoices/${invoiceId}`, { status });
  }

  public deleteInvoice(invoiceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}invoices/${invoiceId}`);
  }
}

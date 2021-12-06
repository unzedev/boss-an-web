import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public constructor(private http: HttpClient) { }

  public getAllQueries(filter?: { type?: string, module?: string, user?: string, start_date?: string, end_date?: string, cost?: string }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/queries`, { params: filter || null });
  }

  public getUserQueries(filter?: { type?: string, module?: string, user?: string, start_date?: string, end_date?: string, cost?: string }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/queries/me`, { params: filter || null });
  }

  public getPeopleReport(cpf: string, credit: number, registerData: boolean, behaviorData: boolean, financialData: boolean, restrictData: boolean, onDemandData: boolean, boavistaData: boolean): Observable<any> {
    return this.http.get(`${environment.apiUrl}/people/${cpf}`, { params: {
      credit: credit.toString(),
      register_data: registerData.toString(),
      behavior_data: behaviorData.toString(),
      financial_data: financialData.toString(),
      restrict: restrictData.toString(),
      ondemand: onDemandData.toString(),
      boavista: boavistaData.toString(),
    } });
  }

  public getCompanyReport(cnpj: string, credit: number, registerData: boolean, behaviorData: boolean, restrictData: boolean, onDemandData: boolean, boavistaData: boolean): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/${cnpj}`, { params: {
      credit: credit.toString(),
      register_data: registerData.toString(),
      behavior_data: behaviorData.toString(),
      restrict: restrictData.toString(),
      ondemand: onDemandData.toString(),
      boavista: boavistaData.toString(),
    } });
  }
}

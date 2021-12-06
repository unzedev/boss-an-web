import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public constructor(private http: HttpClient) { }

  public getAllQueries(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/queries`);
  }

  public getUserQueries(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/queries/me`);
  }

  public getPeopleReport(cpf: string, registerData: boolean, behaviorData: boolean, financialData: boolean, restrictData: boolean, onDemandData: boolean, boavistaData: boolean): Observable<any> {
    return this.http.get(`${environment.apiUrl}/people/${cpf}`, { params: {
      register_data: registerData.toString(),
      behavior_data: behaviorData.toString(),
      financial_data: financialData.toString(),
      restrict: restrictData.toString(),
      ondemand: onDemandData.toString(),
      boavista: boavistaData.toString(),
    } });
  }

  public getCompanyReport(cnpj: string, registerData: boolean, behaviorData: boolean, restrictData: boolean, onDemandData: boolean, boavistaData: boolean): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/${cnpj}`, { params: {
      register_data: registerData.toString(),
      behavior_data: behaviorData.toString(),
      restrict: restrictData.toString(),
      ondemand: onDemandData.toString(),
      boavista: boavistaData.toString(),
    } });
  }
}

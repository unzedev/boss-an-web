import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public constructor(private http: HttpClient) { }

  public getAllQueries(filter: { type?: string, module?: string, user?: string, start_date?: string, end_date?: string, cost?: string }, pagination: { offset: number, perPage: number }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/queries`, {
      params: filter || null,
      headers: {
        offset: Number(pagination.offset).toString(),
        per_page: Number(pagination.perPage).toString()
      }
    });
  }

  public getUserQueries(filter?: { type?: string, module?: string, user?: string, start_date?: string, end_date?: string, cost?: string }): Observable<any> {
    return this.http.get(`${environment.apiUrl}/queries/me`, { params: filter || null });
  }

  public createQuery(type: 'PF'|'PJ', document: string, credit: number, modules: string[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/queries`, {
      type,
      document,
      credit: credit.toString(),
      modules,
    });
  }
}

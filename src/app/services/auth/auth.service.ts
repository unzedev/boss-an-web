import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
  ) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/entrar');
    this.alertService.openToast('success', 'Deslogado');
  }

  public setAuthToken(token: string): any {
    localStorage.setItem('authToken', token);
  }

  public getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  public userIsLoggedIn(): boolean {
    return !!localStorage.getItem('authToken') && !!localStorage.getItem('user');
  }

  public setUser(user: any): any {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
}

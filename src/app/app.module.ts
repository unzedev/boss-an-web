import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { ChartsModule } from 'ng2-charts';
import localePt from '@angular/common/locales/pt';

import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { ApplicationComponent } from './pages/application/application.component';
import { UsersComponent } from './pages/application/users/users.component';
import { ReportComponent } from './pages/application/report/report.component';
import { DashboardComponent } from './pages/application/dashboard/dashboard.component';
import { ReportsComponent } from './pages/application/reports/reports.component';

import { AdminApplicationComponent } from './pages/admin-application/admin-application.component';
import { AdminDashboardComponent } from './pages/admin-application/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './pages/admin-application/admin-reports/admin-reports.component';
import { AdminUsersComponent } from './pages/admin-application/admin-users/admin-users.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ApplicationComponent,
    UsersComponent,
    ReportComponent,
    DashboardComponent,
    ReportsComponent,
    AdminApplicationComponent,
    AdminDashboardComponent,
    AdminReportsComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    LoadingBarHttpClientModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot({
      align: 'right',
      allowNegative: false,
      allowZero: true,
      decimal: ',',
      precision: 2,
      prefix: 'R$ ',
      suffix: '',
      thousands: '.',
      nullable: true,
      min: 0,
      max: null,
      inputMode: CurrencyMaskInputMode.FINANCIAL
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

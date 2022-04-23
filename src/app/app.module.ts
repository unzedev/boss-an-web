import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { ChartsModule } from 'ng2-charts';
import localePt from '@angular/common/locales/pt';
import { NgxLoadingModule } from "ngx-loading";

import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgotPasswordStepOneComponent } from './pages/forgot-password/forgot-password-step-one/forgot-password-step-one.component';
import { ForgotPasswordStepTwoComponent } from './pages/forgot-password/forgot-password-step-two/forgot-password-step-two.component';

import { ApplicationComponent } from './pages/application/application.component';
import { UsersComponent } from './pages/application/users/users.component';
import { ReportComponent } from './pages/application/report/report.component';
import { DashboardComponent } from './pages/application/dashboard/dashboard.component';
import { ReportsComponent } from './pages/application/reports/reports.component';
import { ReportResultComponent } from './pages/application/report-result/report-result.component';
import { InvoicesComponent } from './pages/application/invoices/invoices.component';
import { UserInfoComponent } from './pages/application/user-info/user-info.component';
import { PlansComponent } from './pages/application/plans/plans.component';

import { AdminApplicationComponent } from './pages/admin-application/admin-application.component';
import { AdminDashboardComponent } from './pages/admin-application/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './pages/admin-application/admin-reports/admin-reports.component';
import { AdminUsersComponent } from './pages/admin-application/admin-users/admin-users.component';
import { AdminInvoicesComponent } from './pages/admin-application/admin-invoices/admin-invoices.component';
import { AdminPlansComponent } from './pages/admin-application/admin-plans/admin-plans.component';
import { AdminInfoComponent } from './pages/admin-application/admin-info/admin-info.component';

import { BossModulePipe } from './pipes/boss-module.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordStepOneComponent,
    ForgotPasswordStepTwoComponent,
    HomeComponent,
    ApplicationComponent,
    UsersComponent,
    UserInfoComponent,
    ReportComponent,
    DashboardComponent,
    ReportsComponent,
    ReportResultComponent,
    InvoicesComponent,
    PlansComponent,
    AdminApplicationComponent,
    AdminDashboardComponent,
    AdminReportsComponent,
    AdminUsersComponent,
    AdminInvoicesComponent,
    AdminPlansComponent,
    AdminInfoComponent,
    // PIPES
    BossModulePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgxLoadingModule.forRoot({}),
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
      nullable: false,
      min: 0,
      max: null,
      inputMode: CurrencyMaskInputMode.FINANCIAL
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

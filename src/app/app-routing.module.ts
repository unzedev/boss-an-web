import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { InvoicesComponent } from './pages/application/invoices/invoices.component';

import { AdminApplicationComponent } from './pages/admin-application/admin-application.component';
import { AdminUsersComponent } from './pages/admin-application/admin-users/admin-users.component';
import { AdminDashboardComponent } from './pages/admin-application/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './pages/admin-application/admin-reports/admin-reports.component';

import { AdminAuthGuard } from './guards/admin-auth/admin-auth.guard';
import { OwnerAuthGuard } from './guards/owner-auth/owner-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminInvoicesComponent } from './pages/admin-application/admin-invoices/admin-invoices.component';
import { ReportResultComponent } from './pages/application/report-result/report-result.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cadastrar',
    component: RegisterComponent
  },
  {
    path: 'entrar',
    component: LoginComponent
  },
  {
    path: 'esqueci',
    component: ForgotPasswordStepOneComponent
  },
  {
    path: 'redefinir',
    component: ForgotPasswordStepTwoComponent
  },
  {
    path: 'app',
    component: ApplicationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [OwnerAuthGuard],
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [OwnerAuthGuard],
      },
      {
        path: 'consulta',
        component: ReportComponent,
      },
      {
        path: 'consultas/:id',
        component: ReportResultComponent,
      },
      {
        path: 'consultas',
        component: ReportsComponent,
      },
      {
        path: 'faturas',
        component: InvoicesComponent,
        canActivate: [OwnerAuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    component: AdminApplicationComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'usuarios',
        component: AdminUsersComponent,
      },
      {
        path: 'faturas',
        component: AdminInvoicesComponent,
      },
      {
        path: 'consultas',
        component: AdminReportsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'app',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

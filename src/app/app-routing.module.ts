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
import { ReportResultComponent } from './pages/application/report-result/report-result.component';
import { PlansComponent } from './pages/application/plans/plans.component';
import { UserInfoComponent } from './pages/application/user-info/user-info.component';

import { AdminApplicationComponent } from './pages/admin-application/admin-application.component';
import { AdminUsersComponent } from './pages/admin-application/admin-users/admin-users.component';
import { AdminDashboardComponent } from './pages/admin-application/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './pages/admin-application/admin-reports/admin-reports.component';
import { AdminPlansComponent } from './pages/admin-application/admin-plans/admin-plans.component';
import { AdminInvoicesComponent } from './pages/admin-application/admin-invoices/admin-invoices.component';
import { AdminInfoComponent } from './pages/admin-application/admin-info/admin-info.component';

import { AdminAuthGuard } from './guards/admin-auth/admin-auth.guard';
import { OwnerAuthGuard } from './guards/owner-auth/owner-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    redirectTo: '/entrar',
    pathMatch: 'full'
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
        path: 'conta',
        component: UserInfoComponent,
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [OwnerAuthGuard],
      },
      {
        path: 'analise',
        component: ReportComponent,
      },
      {
        path: 'analises/:id',
        component: ReportResultComponent,
      },
      {
        path: 'analises',
        component: ReportsComponent,
      },
      {
        path: 'faturas',
        component: InvoicesComponent,
        canActivate: [OwnerAuthGuard],
      },
      {
        path: 'planos',
        component: PlansComponent,
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
        path: 'conta',
        component: AdminInfoComponent,
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
        path: 'analises',
        component: AdminReportsComponent,
      },
      {
        path: 'analises/:id',
        component: ReportResultComponent,
      },
      {
        path: 'planos',
        component: AdminPlansComponent,
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

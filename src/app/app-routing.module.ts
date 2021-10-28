import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ApplicationComponent } from './pages/application/application.component';
import { UsersComponent } from './pages/application/users/users.component';
import { PeopleReportComponent } from './pages/application/people-report/people-report.component';
import { CompanyReportComponent } from './pages/application/company-report/company-report.component';

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
    path: 'app',
    component: ApplicationComponent,
    children: [
      {
        path: 'usuarios',
        component: UsersComponent,
      },
      {
        path: 'consulta-cpf',
        component: PeopleReportComponent,
      },
      {
        path: 'consulta-cnpj',
        component: CompanyReportComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

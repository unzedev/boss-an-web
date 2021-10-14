import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ApplicationComponent } from './pages/application/application.component';
import { RestaurantsComponent } from './pages/application/restaurants/restaurants.component';

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
        path: 'restaurantes',
        component: RestaurantsComponent,
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

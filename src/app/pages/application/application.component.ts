import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  public user: any = {
    name: '',
    email: '',
  };

  public sidebarToggle = true;

  public constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  public ngOnInit(): void {
    if (!this.authService.userIsLoggedIn()) {
      this.router.navigateByUrl('/entrar');
    } else {
      this.getUser();
    }
  }

  public getUser(): void {
    const user: any = this.authService.getUser();
    this.user.name = user.name;
    this.user.email = user.email;
  }


  public logout(): void {
    this.alertService.openDangerConfirmDialog(
      'Sair',
      'Você tem certeza que deseja deslogar e sair da sua conta?',
      'Deslogar e sair',
      'Cancelar',
      () => {
        this.authService.logout();
      }
    );
  }

  public toggleSidebar(bool?: boolean): void {
    if (bool) {
      this.sidebarToggle = bool;
    } else {
      this.sidebarToggle = !this.sidebarToggle;
    }
  }

}

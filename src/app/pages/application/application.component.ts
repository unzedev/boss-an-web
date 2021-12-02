import { Component, OnInit } from '@angular/core';

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
    role: '',
  };

  public navbarToggle = true;

  public constructor(
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  public ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    const user: any = this.authService.getUser();
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.role = user.role;
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

  public toggleNavbar(bool?: boolean): void {
    if (bool) {
      this.navbarToggle = bool;
    } else {
      this.navbarToggle = !this.navbarToggle;
    }
  }

}

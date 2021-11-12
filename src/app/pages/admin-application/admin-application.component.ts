import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-admin-application',
  templateUrl: './admin-application.component.html',
  styleUrls: ['./admin-application.component.scss']
})
export class AdminApplicationComponent implements OnInit {

  public user: any = {
    name: '',
    email: '',
  };

  public sidebarToggle = true;

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

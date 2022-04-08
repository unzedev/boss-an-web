import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading: boolean;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  public userIsBlocked: boolean;

  public constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    ) { }

  public ngOnInit(): void {
  }

  public goBackToForm() {
    this.userIsBlocked = false;
  }

  public login(): void {
    this.loading = true;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe((data: any) => {
        this.loading = false;
        if (data.user.active) {
          this.authService.setAuthToken(data.accessToken);
          this.authService.setUser(data.user);
          if (data.user.role === 'admin') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/app');
          }
        } else {
          this.userIsBlocked = true;
        }
      }, (error: any) => {
        this.loading = false;
        this.alertService.openToast('error', 'Email e/ou senha incorretos');
      });
  }

}

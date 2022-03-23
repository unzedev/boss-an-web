import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-step-one',
  templateUrl: './forgot-password-step-one.component.html',
  styleUrls: ['./forgot-password-step-one.component.scss']
})
export class ForgotPasswordStepOneComponent implements OnInit {

  public emailSent: boolean;
  public loading: boolean;
  public forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    ) { }

  public ngOnInit(): void {
  }

  public forgotPassword(): void {
    this.loading = true;
    this.authService.forgotPassword(this.forgotPasswordForm.get('email').value)
      .pipe(first())
      .subscribe((data: any) => {
        this.loading = false;
        this.emailSent = true;
      }, (error: any) => {
        this.loading = false;
        this.alertService.openToast('error', 'Email não encontrado');
      });
  }

  public closeTab() {
    window.close();
  }

}

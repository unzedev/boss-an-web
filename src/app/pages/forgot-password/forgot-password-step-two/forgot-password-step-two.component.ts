import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-step-two',
  templateUrl: './forgot-password-step-two.component.html',
  styleUrls: ['./forgot-password-step-two.component.scss']
})
export class ForgotPasswordStepTwoComponent implements OnInit {

  public didResetPassword: boolean;
  public loading: boolean;
  public forgotPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  public token: string;

  public constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    ) { }

  public ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap: any) => {
      this.token = paramMap.params.token;
    });
  }

  public forgotPassword(): void {
    this.loading = true;
    this.authService.resetPassword(this.token, this.forgotPasswordForm.get('newPassword').value, this.forgotPasswordForm.get('newPassword').value)
      .pipe(first())
      .subscribe((data: any) => {
        this.loading = false;
        this.didResetPassword = true;
      }, (error: any) => {
        this.loading = false;
        this.alertService.openToast('error', 'Email não encontrado');
      });
  }

}

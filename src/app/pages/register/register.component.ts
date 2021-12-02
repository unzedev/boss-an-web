import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading: boolean;
  public registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required, Validators.minLength(14), IsValidCNPJ()]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email, ConfirmField('email')]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, ConfirmField('password')]),
    addressStreet: new FormControl('', Validators.required),
    addressNumber: new FormControl('', Validators.required),
    addressComplement: new FormControl(''),
    addressNeighborhood: new FormControl('', Validators.required),
    addressCity: new FormControl('', Validators.required),
    addressState: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue),
  });

  public constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  public ngOnInit(): void {

  }

  public register(): void {
    this.loading = true;
    this.userService.createUser(this.registerForm.value)
      .pipe(first())
      .subscribe((data: any) => {
        this.loading = false;
        this.alertService.openSuccessConfirmDialog('Seu cadastro está sendo analisado!', 'Por favor aguarde a validação para começar a utilizar a sua conta Boss Analytics', 'Ok', '', () => {
          this.router.navigate(['/']);
        });
      }, (error: any) => {
        this.loading = false;
        this.alertService.openToast('error', 'Erro ao realizar cadastro');
      });
  }

}

function IsValidCNPJ() {
  return (control: FormControl) => {
    return isValidCNPJ(control.value) ? null : { invalidCNPJ: true };
  };
}

function ConfirmField(fieldInput: string) {
  let confirmControl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    if (!confirmControl) {
      confirmControl = control.parent.get(fieldInput) as FormControl;
      control.valueChanges.subscribe(() => {
        confirmControl.updateValueAndValidity();
      });
    }

    if (control.value !== confirmControl.value) {
      return {
        notMatch: true
      };
    }
    return null;
  };
}

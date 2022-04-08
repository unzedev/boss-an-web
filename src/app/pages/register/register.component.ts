import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';
import { ConfirmField } from 'src/app/validators/confirm-field.validator';
import { IsValidCNPJ } from 'src/app/validators/cnpj.validator';

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
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, ConfirmField('password')]),
    addressStreet: new FormControl('', Validators.required),
    addressNumber: new FormControl('', Validators.required),
    addressComplement: new FormControl(''),
    addressNeighborhood: new FormControl('', Validators.required),
    addressCity: new FormControl('', Validators.required),
    addressState: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue),
  });
  public currentStep = 1;
  public plans = [];
  public selectedPlan: any;

  public constructor(
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  public ngOnInit(): void {
    this.getPlans();
  }

  public getPlans(): void {
    this.userService.getPlans()
      .pipe(first())
      .subscribe((data: any) => {
        this.plans = data;
      }, (error: any) => {
        this.alertService.openToast('error', 'Erro ao buscar planos');
      });
  }

  public selectPlan(plan: any) {
    this.selectedPlan = plan;
    this.currentStep = 2;
  }

  public goToStep(step: number) {
    this.currentStep = step;
  }

  public register(): void {
    this.loading = true;
    const user = this.registerForm.value;
    user.address = {
      street: this.registerForm.value.addressStreet,
      number: this.registerForm.value.addressNumber,
      complement: this.registerForm.value.addressComplement,
      neighborhood: this.registerForm.value.addressNeighborhood,
      city: this.registerForm.value.addressCity,
      state: this.registerForm.value.addressState,
    };
    user.plan = this.selectedPlan._id;
    this.userService.createUser(user)
      .pipe(first())
      .subscribe((data: any) => {
        this.loading = false;
        this.currentStep = 3;
      }, (error: any) => {
        this.loading = false;
        this.alertService.openToast('error', 'Erro ao realizar cadastro');
      });
  }
}
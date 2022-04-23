import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { IsValidCNPJ } from 'src/app/validators/cnpj.validator';
import { ConfirmField } from 'src/app/validators/confirm-field.validator';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.scss']
})
export class AdminInfoComponent implements OnInit {

  public loading: boolean = false;

  public userForm: FormGroup = new FormGroup({
    email: new FormControl('', []),
    document: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl(''),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    }),
  });

  public userPasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, ConfirmField('password')]),
  });

  public resultModal = {
    open: false,
    summary: [],
  };

  public userRole: string = '';

  public currentStep = 1;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUser().role;
    this.getUserInfo();
  }

  private getUserInfo(): void {
    this.adminService.getAdminInfo()
      .pipe(first())
      .subscribe((userInfo: any) => {
        this.userForm.patchValue(userInfo);
      });
  }

  public saveUser() {
    const reqBody = this.userForm.value;
    delete reqBody.email;
    delete reqBody.document;
    this.adminService.saveAdminInfo(reqBody)
      .pipe(first())
      .subscribe((userInfo: any) => {
        this.alertService.openToast('success', 'Dados salvos!');
      });
  }

  public saveUserPassword() {
    const reqBody = this.userPasswordForm.value;
    delete reqBody.confirmPassword;
    this.authService.changeUserPassword(reqBody)
    .pipe(first())
    .subscribe((userInfo: any) => {
      this.alertService.openToast('success', 'Senha alterada!');
    });
  }

  public getSummary(invoice: any) {
    this.resultModal = {
      open: true,
      summary: invoice.summary,
    };
  }

  public closeModal() {
    this.resultModal = {
      open: false,
      summary: [],
    };
  }

}

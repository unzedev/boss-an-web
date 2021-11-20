import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, UserConfig } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public loading: boolean = false;

  public users: User[] = [];

  public createConfigModal = {
    open: false,
    userId: '',
  };

  public createConfigForm: FormGroup = new FormGroup({
    pf_register_data: new FormControl('', [Validators.required]),
    pf_financial_data: new FormControl('', [Validators.required]),
    pf_behavior_data: new FormControl('', [Validators.required]),
    pf_restrict: new FormControl('', [Validators.required]),
    pf_ondemand: new FormControl('', Validators.required),
    pf_serasa_boavista: new FormControl('', Validators.required),
    pj_register_data: new FormControl('', [Validators.required]),
    pj_financial_data: new FormControl('', [Validators.required]),
    pj_behavior_data: new FormControl('', [Validators.required]),
    pj_restrict: new FormControl('', [Validators.required]),
    pj_ondemand: new FormControl('', Validators.required),
    pj_serasa_boavista: new FormControl('', Validators.required),
  });

  public updateConfigModal = {
    open: false,
    pfId: '',
    pjId: '',
  };

  public updateConfigForm: FormGroup = new FormGroup({
    pf_register_data: new FormControl('', [Validators.required]),
    pf_financial_data: new FormControl('', [Validators.required]),
    pf_behavior_data: new FormControl('', [Validators.required]),
    pf_restrict: new FormControl('', [Validators.required]),
    pf_ondemand: new FormControl('', Validators.required),
    pf_serasa_boavista: new FormControl('', Validators.required),
    pj_register_data: new FormControl('', [Validators.required]),
    pj_financial_data: new FormControl('', [Validators.required]),
    pj_behavior_data: new FormControl('', [Validators.required]),
    pj_restrict: new FormControl('', [Validators.required]),
    pj_ondemand: new FormControl('', Validators.required),
    pj_serasa_boavista: new FormControl('', Validators.required),
  });

  public createUserInvoiceModal = {
    open: false,
    userId: '',
  };

  public createUserInvoiceForm: FormGroup = new FormGroup({
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.adminService.getUsers()
      .pipe(first())
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public createConfig() {
    this.loading = true;

    let createPfConfig = this.adminService.createConfig({
      type: 'PF',
      user: this.createConfigModal.userId,
      register_data: this.createConfigForm.get('pf_register_data').value,
      financial_data: this.createConfigForm.get('pf_financial_data').value,
      behavior_data: this.createConfigForm.get('pf_behavior_data').value,
      restrict: this.createConfigForm.get('pf_restrict').value,
      ondemand: this.createConfigForm.get('pf_ondemand').value,
      serasa_boavista:this.createConfigForm.get('pf_serasa_boavista').value
    });

    let createPjConfig = this.adminService.createConfig({
      type: 'PJ',
      user: this.createConfigModal.userId,
      register_data: this.createConfigForm.get('pj_register_data').value,
      financial_data: this.createConfigForm.get('pj_financial_data').value,
      behavior_data: this.createConfigForm.get('pj_behavior_data').value,
      restrict: this.createConfigForm.get('pj_restrict').value,
      ondemand: this.createConfigForm.get('pj_ondemand').value,
      serasa_boavista:this.createConfigForm.get('pj_serasa_boavista').value
    });

    forkJoin([createPfConfig, createPjConfig])
      .pipe(first())
      .subscribe((results: any) => {
        this.adminService.approveUser(this.createConfigModal.userId)
          .pipe(first())
          .subscribe((user: User) => {
            this.users.forEach((r, index) => {
              if (r._id === this.createConfigModal.userId) {
                this.users[index].status = 'approved';
                return;
              }
            });
            this.closeModal();
            this.alertService.openToast('success', 'Usuário ativado!');
            this.loading = false;
          }, (error) => {
            this.loading = false;
          });
      }, (error) => {
        this.loading = false;
      });
  }

  public updateConfig() {
    this.loading = true;

    let updatePfConfig = this.adminService.updateConfig({
      id: this.updateConfigModal.pfId,
      register_data: this.updateConfigForm.get('pf_register_data').value,
      financial_data: this.updateConfigForm.get('pf_financial_data').value,
      behavior_data: this.updateConfigForm.get('pf_behavior_data').value,
      restrict: this.updateConfigForm.get('pf_restrict').value,
      ondemand: this.updateConfigForm.get('pf_ondemand').value,
      serasa_boavista:this.updateConfigForm.get('pf_serasa_boavista').value
    });

    let updatePjConfig = this.adminService.updateConfig({
      id: this.updateConfigModal.pjId,
      register_data: this.updateConfigForm.get('pj_register_data').value,
      financial_data: this.updateConfigForm.get('pj_financial_data').value,
      behavior_data: this.updateConfigForm.get('pj_behavior_data').value,
      restrict: this.updateConfigForm.get('pj_restrict').value,
      ondemand: this.updateConfigForm.get('pj_ondemand').value,
      serasa_boavista:this.updateConfigForm.get('pj_serasa_boavista').value
    });

    forkJoin([updatePfConfig, updatePjConfig])
      .pipe(first())
      .subscribe((results: any) => {
        this.closeModal();
        this.alertService.openToast('success', 'Valores atualizados!');
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  public editUserConfig(user: User) {
    this.loading = true;

    this.adminService.getUserConfig(user._id)
      .pipe(first())
      .subscribe((configs: UserConfig[]) => {
        let pf = null;
        let pj = null;
        configs.forEach(config => {
          if (config.type === 'PF') {
            pf = config;
          } else if (config.type === 'PJ') {
            pj = config;
          }
        });
        this.updateConfigForm.get('pf_register_data').setValue(pf.register_data);
        this.updateConfigForm.get('pf_financial_data').setValue(pf.financial_data);
        this.updateConfigForm.get('pf_behavior_data').setValue(pf.behavior_data);
        this.updateConfigForm.get('pf_restrict').setValue(pf.restrict);
        this.updateConfigForm.get('pf_ondemand').setValue(pf.ondemand);
        this.updateConfigForm.get('pf_serasa_boavista').setValue(pf.serasa_boavista);
        this.updateConfigForm.get('pj_register_data').setValue(pj.register_data);
        this.updateConfigForm.get('pj_financial_data').setValue(pj.financial_data);
        this.updateConfigForm.get('pj_behavior_data').setValue(pj.behavior_data);
        this.updateConfigForm.get('pj_restrict').setValue(pj.restrict);
        this.updateConfigForm.get('pj_ondemand').setValue(pj.ondemand);
        this.updateConfigForm.get('pj_serasa_boavista').setValue(pj.serasa_boavista);
        this.updateConfigModal = {
          open: true,
          pfId: pf._id,
          pjId: pj._id,
        };
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  public createUserInvoice(user: User) {
    this.createUserInvoiceModal = {
      open: true,
      userId: user._id,
    };
  }

  public doCreateUserInvoice() {
    this.loading = true;

    const invoiceConfig = {
      user: this.createUserInvoiceModal.userId,
      month: Number(this.createUserInvoiceForm.get('month').value),
      year: Number(this.createUserInvoiceForm.get('year').value),
    };

    this.adminService.createInvoice(invoiceConfig)
      .pipe(first())
      .subscribe((results: any) => {
        this.closeModal();
        this.alertService.openToast('success', 'Fatura gerada!');
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  public closeModal() {
    this.createConfigModal = {
      open: false,
      userId: '',
    };
    this.updateConfigModal = {
      open: false,
      pfId: '',
      pjId: '',
    };
    this.createUserInvoiceModal = {
      open: false,
      userId: '',
    };
  }

  public approveUser(userToApprove: User) {
    this.createConfigModal = {
      open: true,
      userId: userToApprove._id,
    };
  }

  public rejectUser(userToReject: User) {
    this.loading = true;

    this.adminService.rejectUser(userToReject._id)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.forEach((r, index) => {
          if (r._id === this.createConfigModal.userId) {
            this.users[index].status = 'disapproved';
            return;
          }
        });
        this.alertService.openToast('warning', 'Usuário rejeitado!');
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

}

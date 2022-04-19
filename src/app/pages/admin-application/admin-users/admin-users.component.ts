import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public loading: boolean = false;

  public filter = {
    status: '',
    role: 'user',
    document: '',
    email: '',
    name: '',
  };

  public users: User[] = [];

  public createUserInvoiceModal = {
    open: false,
    userId: '',
  };

  public createUserInvoiceForm: FormGroup = new FormGroup({
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  public pagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  goToPage(page: number): void {
    const p = this.pagination;
    p.currentPage = page;
    p.offset = page * p.perPage - p.perPage;
    this.getUsers();
  }

  public getUsers(): void {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    const pagination = {
      offset: this.pagination.offset,
      perPage: this.pagination.perPage,
    };
    this.adminService.getUsers(filter, pagination)
      .pipe(first())
      .subscribe((users: any) => {
        this.users = users.data;
        this.pagination.currentPage = users.pagination.currentPage;
        this.pagination.maxPages = users.pagination.maxPages;
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
    this.createUserInvoiceModal = {
      open: false,
      userId: '',
    };
  }

  public approveUser(user: User) {
    this.alertService.openSuccessConfirmDialog('Aprovar Usuário', 'Deseja aprovar este usuário?', 'Confirmar', 'Cancelar', () => {
      this.adminService.approveUser(user._id)
      .pipe(first())
      .subscribe((res: any) => {
        this.users.forEach((r, index) => {
          if (r._id === user._id) {
            this.users[index].status = 'approved';
            return;
          }
        });
        this.alertService.openToast('success', 'Usuário aprovado!');
      });
    });
  }

  public rejectUser(user: User) {
    this.alertService.openDangerConfirmDialog('Reprovar Usuário', 'Deseja reprovar este usuário?', 'Reprovar', 'Voltar', () => {
      this.adminService.rejectUser(user._id)
      .pipe(first())
      .subscribe((res: any) => {
        this.users.forEach((r, index) => {
          if (r._id === user._id) {
            this.users[index].status = 'disapproved';
            return;
          }
        });
        this.alertService.openToast('warning', 'Usuário reprovado!');
      });
    });
  }

}

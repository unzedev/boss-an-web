import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.scss']
})
export class AdminInvoicesComponent implements OnInit {

  public filter = {
    status: '',
    month: '',
    year: '',
    document: '',
    name: '',
  };

  public invoices: any[] = [];

  public resultModal = {
    open: false,
    invoiceId: null,
    summary: [],
    reports: [],
  };

  public pagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  public resultPagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  goToPage(page: number): void {
    const p = this.pagination;
    p.currentPage = page;
    p.offset = page * p.perPage - p.perPage;
    this.getInvoices();
  }

  public getInvoices(): void {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    const pagination = {
      offset: this.pagination.offset,
      perPage: this.pagination.perPage,
    };
    this.adminService.getInvoices(filter, pagination)
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices.data;
        this.pagination.currentPage = invoices.pagination.currentPage;
        this.pagination.maxPages = invoices.pagination.maxPages;

      });
  }

  public setInvoiceAsPaid(invoiceId: string) {
    this.alertService.openSuccessConfirmDialog('Marcar como Pago', 'Deseja marcar esta fatura como paga?', 'Confirmar', 'Cancelar', () => {
      this.adminService.updateInvoiceStatus(invoiceId, 'paid')
      .pipe(first())
      .subscribe((res: any) => {
        this.invoices.forEach((i: any) => {
          if (i._id === invoiceId) {
            i.status = 'paid';
          }
        });
      });
    });
  }

  goToPageResult(page: number): void {
    const p = this.resultPagination;
    p.currentPage = page;
    p.offset = page * p.perPage - p.perPage;
    this.getSummary();
  }

  public getSummary(invoice?: any) {
    const pagination = {
      offset: this.resultPagination.offset,
      perPage: this.resultPagination.perPage,
    };
    const id = invoice?._id || this.resultModal.invoiceId;
    const summary = invoice?.summary || this.resultModal.summary;
    this.userService.getInvoiceStatement(id , pagination)
      .pipe(first())
      .subscribe((res: any) => {
        this.resultModal = {
          open: true,
          invoiceId: id,
          summary: summary,
          reports: res.data,
        };
        this.resultPagination.currentPage = res.pagination.currentPage;
        this.resultPagination.maxPages = res.pagination.maxPages;
      });
  }

  public closeModal() {
    this.resultModal = {
      open: false,
      invoiceId: null,
      summary: [],
      reports: [],
    };
  }

}

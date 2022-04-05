import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';

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
    user: '',
    name: '',
  };

  public invoices: any[] = [];

  public resultModal = {
    open: false,
    summary: [],
  };

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

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
  };

  public invoices: any[] = [];

  public resultModal = {
    open: false,
    summary: [],
  };

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  public getInvoices(): void {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    this.adminService.getInvoices(filter)
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices;
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

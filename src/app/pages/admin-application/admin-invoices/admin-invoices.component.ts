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

  public invoices: any[] = [];

  public resultModal = {
    open: false,
  };

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  private getInvoices(): void {
    this.adminService.getInvoices()
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

  public closeModal() {
    this.resultModal = {
      open: false,
    };
  }

}

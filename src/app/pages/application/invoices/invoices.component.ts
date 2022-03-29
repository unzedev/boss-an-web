import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public invoices: any[] = [];

  public filter = {
    month: '',
    nf: '',
    status: '',
    payment: '',
  };

  public resultModal = {
    open: false,
    summary: [],
  };

  public userRole: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getMyOrAllInvoices();
  }

  public getMyOrAllInvoices() {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    this.userRole = this.authService.getUser().role;
    if (this.userRole === 'user') {
      this.getInvoices();
    } else {
      this.getMyInvoices();
    }
  }

  private getMyInvoices(): void {
    this.userService.getUserInvoices()
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices;
      });
  }

  private getInvoices(): void {
    this.userService.getUserInvoices()
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices;
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

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

  public pagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  public userRole: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getMyOrAllInvoices();
  }

  goToPage(page: number): void {
    const p = this.pagination;
    p.currentPage = page;
    p.offset = page * p.perPage - p.perPage;
    this.getMyOrAllInvoices();
  }

  public getMyOrAllInvoices() {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    const pagination = {
      offset: this.pagination.offset,
      perPage: this.pagination.perPage,
    };
    this.userRole = this.authService.getUser().role;
    if (this.userRole === 'user') {
      this.getInvoices(pagination);
    } else {
      this.getMyInvoices(pagination);
    }
  }

  private getMyInvoices(pagination: any): void {
    this.userService.getUserInvoices(pagination)
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices.data;
        this.pagination.currentPage = invoices.pagination.currentPage;
        this.pagination.maxPages = invoices.pagination.maxPages;
      });
  }

  private getInvoices(pagination: any): void {
    this.userService.getUserInvoices(pagination)
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices.data;
        this.pagination.currentPage = invoices.pagination.currentPage;
        this.pagination.maxPages = invoices.pagination.maxPages;
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

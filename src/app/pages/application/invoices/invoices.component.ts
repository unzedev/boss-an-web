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
    year: '',
    status: '',
  };

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
      this.getInvoices(pagination, filter);
    } else {
      this.getMyInvoices(pagination, filter);
    }
  }

  private getMyInvoices(pagination: any, filter: any): void {
    this.userService.getUserInvoices(pagination, filter)
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices.data;
        this.pagination.currentPage = invoices.pagination.currentPage;
        this.pagination.maxPages = invoices.pagination.maxPages;
      });
  }

  private getInvoices(pagination: any, filter: any): void {
    this.userService.getUserInvoices(pagination, filter)
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices.data;
        this.pagination.currentPage = invoices.pagination.currentPage;
        this.pagination.maxPages = invoices.pagination.maxPages;
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

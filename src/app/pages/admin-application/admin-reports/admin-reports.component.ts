import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent implements OnInit {

  public filter = {
    type: '',
    module: '',
    user: '',
    start_date: '',
    end_date: '',
    cost: 0,
  };

  public reports: any[] = [];

  public resultModal = {
    open: false,
    result: [],
  };

  public pagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  goToPage(page: number): void {
    const p = this.pagination;
    p.currentPage = page;
    p.offset = page * p.perPage - p.perPage;
    this.getReports();
  }

  public getReports(): void {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    if (filter.cost) filter.cost = filter.cost.toString();
    const pagination = {
      offset: this.pagination.offset,
      perPage: this.pagination.perPage,
    };
    this.adminService.getQueries(filter, pagination)
      .pipe(first())
      .subscribe((reports: any) => {
        this.reports = reports.data;
        this.pagination.currentPage = reports.pagination.currentPage;
        this.pagination.maxPages = reports.pagination.maxPages;
      });
  }

  public getResult(report: any) {
    this.resultModal = {
      open: true,
      result: report.result,
    };
  }

  public closeModal() {
    this.resultModal = {
      open: false,
      result: [],
    };
  }

  public isObject(val) {
    return (typeof val === 'object');
  }

}

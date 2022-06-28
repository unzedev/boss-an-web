import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {

  public filter = {
    type: '',
    module: '',
    document: '',
    start_date: '',
    end_date: '',
    cost: 0,
  };

  public reports: any[] = [];

  public pagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  public userRole: string = '';

  private fetchInterval;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  ngOnDestroy(): void {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
  }

  goToPage(page: number): void {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
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
    this.reportService.getAllQueries(filter, pagination)
      .pipe(first())
      .subscribe((reports: any) => {
        this.reports = reports.data;
        this.pagination.currentPage = reports.pagination.currentPage;
        this.pagination.maxPages = reports.pagination.maxPages;
        this.checkForProcessingReports(this.reports);
      });
  }

  public checkForProcessingReports(reports: any[]) {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
    let hasProcessing = reports.some((item, index, array) => {
      return item.status === 'PROCESSING';
    });
    if (hasProcessing) {
      this.fetchInterval = setInterval(() => {
        this.getReports();
      }, 15000)
    }
  }

}

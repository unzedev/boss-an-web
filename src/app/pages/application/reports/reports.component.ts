import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

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

  public userRole: string = '';

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  public getReports(): void {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    if (filter.cost) filter.cost = filter.cost.toString();
    this.reportService.getAllQueries(filter)
      .pipe(first())
      .subscribe((reports: any) => {
        this.reports = reports;
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

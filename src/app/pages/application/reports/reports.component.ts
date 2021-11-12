import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public reports: any[] = [];

  public resultModal = {
    open: false,
    result: [],
  };

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  private getReports(): void {
    this.reportService.getAllQueries()
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

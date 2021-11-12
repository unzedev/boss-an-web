import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  public userRole: string = '';

  constructor(
    private reportService: ReportService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUser().role;
    if (this.userRole === 'user') {
      this.getReports();
    } else {
      this.getMyReports();
    }
  }

  private getMyReports(): void {
    this.reportService.getUserQueries()
      .pipe(first())
      .subscribe((reports: any) => {
        this.reports = reports;
      });
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

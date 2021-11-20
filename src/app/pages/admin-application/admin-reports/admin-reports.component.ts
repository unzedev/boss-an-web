import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent implements OnInit {

  public reports: any[] = [];

  public resultModal = {
    open: false,
    result: [],
  };

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  private getReports(): void {
    this.adminService.getQueries()
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

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

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  public getReports(): void {
    const filter = Object.fromEntries(Object.entries(this.filter).filter(([_, v]) => v != ''));
    if (filter.cost) filter.cost = filter.cost.toString();
    this.adminService.getQueries(filter)
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

import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Pessoa Física', 'Pessoa Jurídica'];
  public doughnutChartData: any = [90, 10];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions = {
    responsive: true,
    circumference: 7,
    cutoutPercentage: 75,
    legend: {
      position: 'right',
    },
  };
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['rgba(57, 219, 143, 1)', 'rgba(122, 54, 255, 1)'],
    borderWidth: 0
  }];

  public reportsTotal: number = 0;
  public reportsTotalPF: number = 0;
  public reportsTotalPJ: number = 0;
  public investedAmount: number = 0;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getDashboardInfo();
  }

  getDashboardInfo(): void {
    this.adminService.getDashboardQueries()
      .pipe(first())
      .subscribe((res: any) => {
        this.investedAmount = Number(res.totalAmount);
        this.reportsTotal = res.queries[0]?.count || 0;
        this.reportsTotalPF = res.queries[1]?.count || 0;
        this.reportsTotalPJ = res.queries[2]?.count || 0;
        this.doughnutChartData = [res.queries[1]?.count || 0, res.queries[2]?.count || 0];
      });
    // this.adminService.getDashboardQueriesByTypes()
    //   .pipe(first())
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
  }

}

import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getDashboardInfo();
  }

  getDashboardInfo(): void {
    this.userService.getDashboardQueries()
      .pipe(first())
      .subscribe((res: any) => {
        this.investedAmount = Number(res.totalAmount);
        res.queries.forEach(query => {
          if (query._id === 'TOTAL') {
            this.reportsTotal = query.count;
          }
          if (query._id === 'PF') {
            this.reportsTotalPF = query.count;
          }
          if (query._id === 'PJ') {
            this.reportsTotalPJ = query.count;
          }
        });
        this.doughnutChartData = [this.reportsTotalPF, this.reportsTotalPJ];
      });
    // this.userService.getDashboardQueriesByTypes()
    //   .pipe(first())
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
  }

}

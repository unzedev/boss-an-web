import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chartAnalysisTypes = {
    labels: ['Pessoa Física', 'Pessoa Jurídica'],
    data: [50, 50],
    type: 'doughnut',
    options: {
      responsive: true,
      circumference: 7,
      cutoutPercentage: 75,
      legend: {
        position: 'right',
      },
    },
    colors: [{
      backgroundColor: ['rgba(57, 219, 143, 1)', 'rgba(122, 54, 255, 1)'],
      borderWidth: 0
    }],
  }

  public chartRecomendation = {
    labels: ['Recomendado', 'Recomendado com atenção', 'Não recomendado'],
    data: [50, 40, 10],
    type: 'doughnut',
    options: {
      responsive: true,
      circumference: 7,
      cutoutPercentage: 75,
      legend: {
        position: 'right',
      },
    },
    colors: [{
      backgroundColor: ['#0BDB90', '#FFBB36', '#FF3636'],
      borderWidth: 0
    }],
  }

  daysArray = [...Array(32).keys()];

  public chartCredit = {
    labels: this.daysArray,
    data: [
      { 
        data: [...Array(32).fill(1)],
        label: 'Recomendado',
        backgroundColor: '#0BDB90',
      },
      { 
        data: [...Array(32).fill(2)],
        label: 'Não recomendado',
        backgroundColor: '#FF3636',
      },
    ],
    type: 'bar',
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
    },
  }

  public chartAnalysisNumbers = {
    data: [
      {
        data: [...Array(32).fill(1)],
        label: 'Pessoa Física',
        backgroundColor: 'transparent',
        borderColor: '#0BDB90',
        pointBackgroundColor: '#0BDB90',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0BDB90',
        fill: 'origin',
      },
      {
        data: [...Array(32).fill(0)],
        label: 'Pessoa Jurídica',
        backgroundColor: 'transparent',
        borderColor: '#7A36FF',
        pointBackgroundColor: '#7A36FF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7A36FF',
        fill: 'origin',
      },
    ],
    labels: this.daysArray,  
    type: 'line',
    options: {
      elements: {
        line: {
          tension: 0
        }
      },
      plugins: {
        legend: { display: true },
      }
    },
  }

  public reportsTotal: number = 0;
  public reportsTotalPF: number = 0;
  public reportsTotalPJ: number = 0;
  public investedAmount: number = 0;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.daysArray.shift();
    this.getDashboardInfo();
  }

  getDashboardInfo(): void {
    this.userService.getDashboardQueries()
      .pipe(first())
      .subscribe((res: any) => {
        this.investedAmount = Number(res.totalAmount);
        res.queries.forEach(query => {
          if (query._id === 'TOTAL') this.reportsTotal = query.count;
          if (query._id === 'PF') this.reportsTotalPF = query.count;
          if (query._id === 'PJ') this.reportsTotalPJ = query.count;
        });
      });
    this.userService.getDashboardQueriesByTypes()
      .pipe(first())
      .subscribe((res: any) => {
        let reportsTotalPF = 0;
        let reportsTotalPJ = 0;
        res.forEach(obj => {
          if (obj.type === 'PF') reportsTotalPF = obj.count;
          if (obj.type === 'PJ') reportsTotalPJ = obj.count;
        });
        this.chartAnalysisTypes.data = [reportsTotalPF, reportsTotalPJ];
      });
    this.userService.getDashboardQueriesByCredit()
      .pipe(first())
      .subscribe((res: any) => {
        const recomendedArray = [];
        const notRecommendedArray = [];
        res.forEach(obj => {
          if (obj.status === 'RECOMENDED') {
            this.daysArray.forEach(dayNumber => {
              obj.days.forEach(day => {
                if (day.day == dayNumber) {
                  recomendedArray.push(day.credit)
                } else {
                  recomendedArray.push(0);
                }
              });
            });
          }
          if (obj.status === 'NOT_RECOMENDED') {
            this.daysArray.forEach(dayNumber => {
              obj.days.forEach(day => {
                if (day.day == dayNumber) {
                  notRecommendedArray.push(day.credit)
                } else {
                  notRecommendedArray.push(0);
                }
              });
            });
          }
        });
        this.chartCredit.data[0].data = recomendedArray;
        this.chartCredit.data[1].data = notRecommendedArray;
      });
    this.userService.getDashboardQueriesByCount()
      .pipe(first())
      .subscribe((res: any) => {
        const pfArray = [];
        const pjArray = [];
        res.forEach(obj => {
          if (obj.type === 'PF') {
            this.daysArray.forEach(dayNumber => {
              obj.days.forEach(day => {
                if (day.day == dayNumber) {
                  pfArray.push(day.count)
                } else {
                  pfArray.push(0);
                }
              });
            });
          }
          if (obj.type === 'PJ') {
            this.daysArray.forEach(dayNumber => {
              obj.days.forEach(day => {
                if (day.day == dayNumber) {
                  pjArray.push(day.count)
                } else {
                  pjArray.push(0);
                }
              });
            });
          }
        });
        this.chartAnalysisNumbers.data[0].data = pfArray;
        this.chartAnalysisNumbers.data[1].data = pjArray;
      });
    this.userService.getDashboardQueriesByStatus()
      .pipe(first())
      .subscribe((res: any) => {
        let recomended = 0;
        let notRecomended = 0;
        let analyse = 0;
        res.forEach(obj => {
          if (obj.status === 'RECOMENDED') recomended = obj.percent.slice(0, -1);
          if (obj.status === 'ANALYSE') analyse = obj.percent.slice(0, -1);
          if (obj.status === 'NOT_RECOMENDED') notRecomended = obj.percent.slice(0, -1);
        });
        this.chartRecomendation.data = [recomended, analyse, notRecomended];
      });
  }

}

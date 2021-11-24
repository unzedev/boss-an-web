import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public loading: boolean = false;

  public selectedDatas: string[] = [];

  public reportPeople: boolean = true;

  public cpf: string = '';
  public cnpj: string = '';

  public response: any = [];

  public pricesPF = {
    register_data: 0,
    behavior_data: 0,
    financial_data: 0,
    restrict: 0,
    ondemand: 0,
    boavista: 0,
  };

  public pricesPJ = {
    register_data: 0,
    behavior_data: 0,
    financial_data: 0,
    restrict: 0,
    ondemand: 0,
    boavista: 0,
  };

  public totalCost: number = 0;

  constructor(
    private reportService: ReportService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getModules();
  }

  public doConsult() {
    this.response = [];
    this.loading = true;
    if (this.reportPeople) {
      this.reportService.getPeopleReport(
        this.cpf,
        this.selectedDatas.includes('register'),
        this.selectedDatas.includes('behavior'),
        this.selectedDatas.includes('financial'),
        this.selectedDatas.includes('restrict'),
        this.selectedDatas.includes('ondemand'),
        this.selectedDatas.includes('boavista'),
      )
        .pipe(first())
        .subscribe((res) => {
          for (let key in res) {
            if (!res.hasOwnProperty(key)) continue;
            var obj = res[key];
            if (obj.Result) {
              this.response.push(obj.Result);
            }
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
        });
    } else {
      this.reportService.getCompanyReport(
        this.cnpj,
        this.selectedDatas.includes('register'),
        this.selectedDatas.includes('behavior'),
        this.selectedDatas.includes('restrict'),
        this.selectedDatas.includes('ondemand'),
        this.selectedDatas.includes('boavista'),
      )
        .pipe(first())
        .subscribe((res) => {
          for (let key in res) {
            if (!res.hasOwnProperty(key)) continue;
            var obj = res[key];
            if (obj.Result) {
              this.response.push(obj.Result);
            }
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
        });
    }
  }

  public selectReportType(people: boolean) {
    this.reportPeople = people;
    this.selectedDatas = [];
    this.cpf = '';
    this.cnpj = '';
    this.totalCost = 0;
    this.response = [];
  }

  public selectData(dataTitle: string, price: number) {
    if (this.selectedDatas.includes(dataTitle)) {
      this.selectedDatas.splice(this.selectedDatas.indexOf(dataTitle), 1);
      this.totalCost -= price;
    } else {
      this.selectedDatas.push(dataTitle);
      this.totalCost += price;
    }
  }

  public isObject(val) {
    return (typeof val === 'object');
  }

  public getModules() {
    this.loading = true;
    this.userService.getUserModules()
      .pipe(first())
      .subscribe((res: any) => {
        res.forEach((item: any) => {
          if (item.type === 'PF') {
            this.pricesPF = {
              register_data: item.register_data,
              behavior_data: item.behavior_data,
              financial_data: item.financial_data,
              restrict: item.restrict,
              ondemand: item.ondemand,
              boavista: item.boavista,
            };
          }
          if (item.type === 'PJ') {
            this.pricesPJ = {
              register_data: item.register_data,
              behavior_data: item.behavior_data,
              financial_data: item.financial_data,
              restrict: item.restrict,
              ondemand: item.ondemand,
              boavista: item.boavista,
            };
          }
        });
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

}

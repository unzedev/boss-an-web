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
  public processing: boolean = false;

  public selectedDatas: string[] = [];

  public reportPeople: boolean = true;

  public cpf: string = '';
  public cnpj: string = '';
  public credit: number = 0;

  public lotModalIsOpen = false;
  public lotModalForm = [
    {
      document: '',
      credit: 0,
    },
    {
      document: '',
      credit: 0,
    }
  ];
  public useBulk = false;

  public pricesPF = {
    register_data: 0,
    behavior_data: 0,
    financial_data: 0,
    restrict: 0,
    ondemand: 0,
    boavista: 0,
    serasa: 0,
  };

  public pricesPJ = {
    register_data: 0,
    behavior_data: 0,
    financial_data: 0,
    restrict: 0,
    ondemand: 0,
    boavista: 0,
    serasa: 0,
  };

  public totalCost: number = 0;

  constructor(
    private reportService: ReportService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getModules();
  }

  public doBulkConsult() {
    this.useBulk = true;
    this.lotModalIsOpen = false;
  }

  public doConsult() {
    this.processing = true;
    this.loading = true;
    if (this.useBulk) {
      this.reportService.createBulkQuery(
        (this.reportPeople ? 'PF' : 'PJ'),
        this.lotModalForm,
        this.selectedDatas
      )
        .pipe(first())
        .subscribe((res) => {
          this.loading = false;
        }, (error) => {
          this.loading = false;
        });
    } else {
      this.reportService.createQuery(
        (this.reportPeople ? 'PF' : 'PJ'),
        (this.reportPeople ? this.cpf : this.cnpj),
        this.credit,
        this.selectedDatas
      )
        .pipe(first())
        .subscribe((res) => {
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
    this.credit = 0;
    this.totalCost = 0;
    this.cancelLotModal();
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

  public getModules() {
    this.loading = true;
    this.userService.getUserPlan()
      .pipe(first())
      .subscribe((res: any) => {
        this.pricesPF = res.person_modules;
        this.pricesPJ = res.company_modules;
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  public addFieldsToLotModalForm() {
    this.lotModalForm.push({
      document: '',
      credit: 0,
    })
  }

  public cancelLotModal() {
    this.lotModalForm = [
      {
        document: '',
        credit: 0,
      },
      {
        document: '',
        credit: 0,
      }
    ];
    this.lotModalIsOpen = false;
    this.useBulk = false;
  }

  public openLotModal() {
    this.lotModalIsOpen = true;
  }

}

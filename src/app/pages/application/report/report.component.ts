import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public selectedDatas: string[] = [];

  public reportPeople: boolean = true;

  public cpf: string = '';
  public cnpj: string = '';

  public response: any = null;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    
  }

  public doConsult() {
    if (this.reportPeople) {
      this.reportService.getPeopleReport(
        this.cpf,
        this.selectedDatas.includes('register'),  
        this.selectedDatas.includes('behavior'),  
        this.selectedDatas.includes('financial'),  
        this.selectedDatas.includes('restrict'),  
        this.selectedDatas.includes('ondemand'),  
      )
        .pipe(first())
        .subscribe((res) => {
          this.response = res.Result;
        });
    } else {
      this.reportService.getCompanyReport(
        this.cnpj,
        this.selectedDatas.includes('register'),  
        this.selectedDatas.includes('behavior'),  
        this.selectedDatas.includes('restrict'),  
        this.selectedDatas.includes('ondemand'),  
      )
        .pipe(first())
        .subscribe((res) => {
          this.response = res.Result;
        });
    }
  }

  public selectData(dataTitle: string) {
    if (this.selectedDatas.includes(dataTitle)) {
      this.selectedDatas.splice(this.selectedDatas.indexOf(dataTitle), 1);
    } else {
      this.selectedDatas.push(dataTitle);
    }
  }

  public isObject(val) {
    return (typeof val === 'object');
  }

}

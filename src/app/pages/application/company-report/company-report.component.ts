import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-company-report',
  templateUrl: './company-report.component.html',
  styleUrls: ['./company-report.component.scss']
})
export class CompanyReportComponent implements OnInit {

  public selectedDatas: string[] = [];

  public cnpj: string = '';

  public response: any = null;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    
  }

  public doConsult() {
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

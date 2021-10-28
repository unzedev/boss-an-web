import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-people-report',
  templateUrl: './people-report.component.html',
  styleUrls: ['./people-report.component.scss']
})
export class PeopleReportComponent implements OnInit {

  public selectedDatas: string[] = [];

  public cpf: string = '';

  public response: any = null;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    
  }

  public doConsult() {
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

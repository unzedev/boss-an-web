import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report-result',
  templateUrl: './report-result.component.html',
  styleUrls: ['./report-result.component.scss']
})
export class ReportResultComponent implements OnInit {

  reportDate: Date;

  registerData: any;
  behaviorData: any;
  financialData: any;
  serasa: any;
  boaVista: any;
  onDemand: any;
  restrict: any;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getReportResult(params.id);
    });
  }

  private getReportResult(id: string) {
    this.reportService.getQueryResult(id).subscribe((res: any) => {
      res.results.forEach((r: any) => {
        if (r.module === 'register_data') {
          this.registerData = r.result;
        }
        if (r.module === 'behavior_data') {
          this.behaviorData = r.result;
        }
        if (r.module === 'financial_data') {
          this.financialData = r.result;
        }
        if (r.module === 'serasa') {
          this.serasa = r.result;
        }
        if (r.module === 'boavista') {
          this.boaVista = r.result;
        }
        if (r.module === 'ondemand') {
          this.onDemand = r.result;
        }
        if (r.module === 'restrict') {
          this.restrict = r.result;
        }
      });
      
      this.reportDate = res.results[0].createdAt;
    });
  }

}

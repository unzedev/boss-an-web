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

  result: any;

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
      this.result = res.results[0].result;
      this.reportDate = res.results[0].createdAt;
    });
  }

}

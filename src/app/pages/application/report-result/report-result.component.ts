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
  restrict: any;
  certEmbargosIbama: any;
  certNegativaIbama: any;
  certPGFN: any;
  certSIPROQUIM: any;
  certFGTS: any;
  certECAC: any;
  certCOAF: any;
  certPoF: any;
  certPoC: any;

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
        if (r.module === 'register_data') this.registerData = r.result
        else if (r.module === 'behavior_data') this.behaviorData = r.result;
        else if (r.module === 'financial_data') this.financialData = r.result;
        else if (r.module === 'serasa') this.serasa = r.result;
        else if (r.module === 'boavista') this.boaVista = r.result;
        else if (r.module === 'restrict') this.restrict = r.result;
        else if (r.module === 'cert_embargos_ibama') this.certEmbargosIbama = r.result;
        else if (r.module === 'cert_negativa_ibama') this.certNegativaIbama = r.result;
        else if (r.module === 'cert_pgfn') this.certPGFN = r.result;
        else if (r.module === 'cert_siproquim') this.certSIPROQUIM = r.result;
        else if (r.module === 'cert_fgts') this.certFGTS = r.result;
        else if (r.module === 'cert_ecac') this.certECAC = r.result;
        else if (r.module === 'cert_coaf') this.certCOAF = r.result;
        else if (r.module === 'cert_antecedentes_policia_federal') this.certPoF = r.result;
        else if (r.module === 'cert_antecedentes_policia_civil') this.certPoC = r.result;
      });

      this.reportDate = res.results[0].createdAt;
    });
  }

  public getNumberFromAtoH(letter: string): number {
    return {
      'A': 0,
      'B': 1,
      'C': 2,
      'D': 3,
      'E': 4,
      'F': 5,
      'G': 6,
      'H': 7,
    }[letter];
  }

}

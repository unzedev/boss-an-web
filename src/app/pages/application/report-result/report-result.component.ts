import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report-result',
  templateUrl: './report-result.component.html',
  styleUrls: ['./report-result.component.scss']
})
export class ReportResultComponent implements OnInit {

  reportId: string;
  recommendation: string = 'ANALYSE';
  module: string;
  credit: number;
  reportDate: Date;
  isPJ: boolean = false;
  isPF: boolean = false;
  isLoading: boolean;
  document: string;

  registerData: any;
  behaviorData: any;
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
    private reportService: ReportService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportId = params.id;
      this.getReportResult(params.id);
    });
  }

  get hasAnyCertificate(): boolean {
    return this.certEmbargosIbama ||
    this.certNegativaIbama ||
    this.certPGFN ||
    this.certSIPROQUIM ||
    this.certFGTS ||
    this.certECAC ||
    this.certCOAF ||
    this.certPoF ||
    this.certPoC;
  }

  private getReportResult(id: string) {
    this.isLoading = true;
    this.reportService.getQuery(id).subscribe((r: any) => {
      if (!['PROCESSING', 'ERROR'].includes(r.status)) {
        if (r.module === 'register_data') this.registerData = r.result
        else if (r.module === 'behavior_data') this.behaviorData = r.result;
        else if (r.module === 'serasa') this.serasa = r.result;
        else if (r.module === 'boavista') this.boaVista = r.result;
        else if (r.module === 'restrict' && !Array.isArray(r.result)) this.restrict = r.result;
        else if (r.module === 'cert_embargos_ibama') this.certEmbargosIbama = r.result;
        else if (r.module === 'cert_negativa_ibama') this.certNegativaIbama = r.result;
        else if (r.module === 'cert_pgfn') this.certPGFN = r.result;
        else if (r.module === 'cert_siproquim') this.certSIPROQUIM = r.result;
        else if (r.module === 'cert_fgts') this.certFGTS = r.result;
        else if (r.module === 'cert_ecac') this.certECAC = r.result;
        else if (r.module === 'cert_coaf') this.certCOAF = r.result;
        else if (r.module === 'cert_antecedentes_policia_federal') this.certPoF = r.result;
        else if (r.module === 'cert_antecedentes_policia_civil') this.certPoC = r.result;

        this.module = r.module;
        this.recommendation = r.status;
        this.credit = r.credit;
        this.document = r.document;
        this.reportDate = r.createdAt;
        this.isPJ = r.type === 'PJ';
        this.isPF = r.type === 'PF';
        this.isLoading = false;
      }
    });
  }

  public getRecommendation(): number {
    return {
      'RECOMENDED': 3,
      'NOT_RECOMENDED': 8,
      'ANALYSE': 5,
    }[this.recommendation];
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

  public getCardRecommendation(obj: any) {
    return {
      'is-recommended': obj.recommendation == 'RECOMENDED',
      'is-not-recommended': obj.recommendation == 'NOT_RECOMENDED',
      'is-analyse': obj.recommendation == 'ANALYSE',
    };
  }

  public goBack() {
    this.location.back();
  }

  public isAuthorOfProcess(process: any[]): boolean {
    return process.some((el) => el.Doc === this.document && el.Type === "AUTHOR");
  }

  public isActiveInProcess(process: any[]): boolean {
    return process.some((el) => el.Doc === this.document && el.IsPartyActive);
  }

  public getPaymentChance(risk: string): string {
    return `${(100 - Number(risk.slice(0, risk.length - 1).replace(',', '.'))).toString().replace('.', ',')}%`;
  }

  public printReport() {
    this.reportService.getReportPrint(this.reportId).subscribe((res: any) => {
      window.open(res.link);
    });
  }

}

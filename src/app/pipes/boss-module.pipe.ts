import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bossModule' })
export class BossModulePipe implements PipeTransform {
  transform(value: string): number {
    const modules = {
        register_data: 'Cadastrais',
        behavior_data: 'Comportamentais',
        financial_data: 'Financeiros',
        restrict: 'Restritivos',
        boavista: 'Boa Vista',
        serasa: 'Serasa',
        cert_embargos_ibama: 'Certidão de Embargos do IBAMA',
        cert_negativa_ibama: 'Certidão de Negativa do IBAMA',
        cert_pgfn: 'Certidão de PGFN',
        cert_siproquim: 'Certidão de SIPROQUIM',
        cert_fgts: 'Certidão de FGTS',
        cert_ecac: 'Certidão de eCAC',
        cert_coaf: 'Certidão de COAF',
        cert_antecedentes_policia_federal: 'Certidão de Antecedentes Criminais - Polícia Federal',
        cert_antecedentes_policia_civil: 'Certidão de Antecedentes Criminais - Polícia Civil' 
    };
    return modules[value];
  }
}

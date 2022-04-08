import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bossModule' })
export class BossModulePipe implements PipeTransform {
  transform(value: string): number {
    const modules = {
        register_data: 'Cadastrais',
        behavior_data: 'Comportamentais',
        financial_data: 'Financeiros',
        restrict: 'Restritos',
        ondemand: 'Certidões',
        boavista: 'Boa Vista',
        serasa: 'Serasa',
    };
    return modules[value];
  }
}

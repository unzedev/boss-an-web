import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.scss']
})
export class AdminPlansComponent implements OnInit {

  public plans: any[] = [];

  public createModal = {
    open: false,
  };

  public createPlanForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    itens: new FormControl('', [Validators.required]),
    person_modules: new FormGroup({
      register_data: new FormControl('', [Validators.required]),
      behavior_data: new FormControl('', [Validators.required]),
      restrict: new FormControl('', [Validators.required]),
      cert_embargos_ibama: new FormControl('', [Validators.required]),
      cert_negativa_ibama: new FormControl('', [Validators.required]),
      cert_pgfn: new FormControl('', [Validators.required]),
      cert_siproquim: new FormControl('', [Validators.required]),
      cert_fgts: new FormControl('', [Validators.required]),
      cert_ecac: new FormControl('', [Validators.required]),
      cert_coaf: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_federal: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_civil: new FormControl('', [Validators.required]),
      boavista: new FormControl('', Validators.required),
      serasa: new FormControl('', Validators.required),
    }),
    company_modules: new FormGroup({
      register_data: new FormControl('', [Validators.required]),
      behavior_data: new FormControl('', [Validators.required]),
      restrict: new FormControl('', [Validators.required]),
      cert_embargos_ibama: new FormControl('', [Validators.required]),
      cert_negativa_ibama: new FormControl('', [Validators.required]),
      cert_pgfn: new FormControl('', [Validators.required]),
      cert_siproquim: new FormControl('', [Validators.required]),
      cert_fgts: new FormControl('', [Validators.required]),
      cert_ecac: new FormControl('', [Validators.required]),
      cert_coaf: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_federal: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_civil: new FormControl('', [Validators.required]),
      boavista: new FormControl('', Validators.required),
      serasa: new FormControl('', Validators.required),
    }),
  });

  public updateModal = {
    open: false,
    id: '',
  };

  public updatePlanForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    itens: new FormControl('', [Validators.required]),
    person_modules: new FormGroup({
      register_data: new FormControl('', [Validators.required]),
      behavior_data: new FormControl('', [Validators.required]),
      restrict: new FormControl('', [Validators.required]),
      cert_embargos_ibama: new FormControl('', [Validators.required]),
      cert_negativa_ibama: new FormControl('', [Validators.required]),
      cert_pgfn: new FormControl('', [Validators.required]),
      cert_siproquim: new FormControl('', [Validators.required]),
      cert_fgts: new FormControl('', [Validators.required]),
      cert_ecac: new FormControl('', [Validators.required]),
      cert_coaf: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_federal: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_civil: new FormControl('', [Validators.required]),
      boavista: new FormControl('', Validators.required),
      serasa: new FormControl('', Validators.required),
    }),
    company_modules: new FormGroup({
      register_data: new FormControl('', [Validators.required]),
      behavior_data: new FormControl('', [Validators.required]),
      restrict: new FormControl('', [Validators.required]),
      cert_embargos_ibama: new FormControl('', [Validators.required]),
      cert_negativa_ibama: new FormControl('', [Validators.required]),
      cert_pgfn: new FormControl('', [Validators.required]),
      cert_siproquim: new FormControl('', [Validators.required]),
      cert_fgts: new FormControl('', [Validators.required]),
      cert_ecac: new FormControl('', [Validators.required]),
      cert_coaf: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_federal: new FormControl('', [Validators.required]),
      cert_antecedentes_policia_civil: new FormControl('', [Validators.required]),
      boavista: new FormControl('', Validators.required),
      serasa: new FormControl('', Validators.required),
    }),
  });

  public pagination = {
    currentPage: 1,
    maxPages: 0,
    offset: 0,
    perPage: 10,
  };

  public loading: boolean = false;

  constructor(
    private adminService: AdminService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getPlans();
  }

  goToPage(page: number): void {
    const p = this.pagination;
    p.currentPage = page;
    p.offset = page * p.perPage - p.perPage;
    this.getPlans();
  }

  public getPlans(): void {
    const pagination = {
      offset: this.pagination.offset,
      perPage: this.pagination.perPage,
    };
    this.adminService.getPlans(pagination)
      .pipe(first())
      .subscribe((plans: any) => {
        this.plans = plans;
        // this.plans = plans.data || [];
        // this.pagination.currentPage = plans.pagination?.currentPage;
        // this.pagination.maxPages = plans.pagination?.maxPages;
      });
  }

  public createPlan() {
    this.loading = true;
    const newPlan = this.createPlanForm.value;
    newPlan.itens = newPlan.itens.split(',');
    newPlan.itens = newPlan.itens.map((item) => {
      return item.trim();
    });
    this.adminService.createPlan(newPlan)
      .pipe(first())
      .subscribe((plan: any) => {
        this.plans.push(plan);
        this.closeModal();
        this.loading = false;
      });
  }

  public updatePlan() {
    this.loading = true;
    const planToUpdate = this.updatePlanForm.value;
    planToUpdate.id = this.updateModal.id;
    this.adminService.savePlan(this.updatePlanForm.value)
      .pipe(first())
      .subscribe(() => {
        this.plans.forEach((r, index) => {
          if (r._id === this.updateModal.id) {
            this.plans[index] = this.updatePlanForm.value;
            this.plans[index].id = planToUpdate.id;
            return;
          }
        });
        this.closeModal();
        this.loading = false;
      });
  }

  public editPlan(plan: any) {
    this.updateModal = {
      open: true,
      id: plan._id,
    };
    this.updatePlanForm.patchValue(plan);
  }

  public openCreateModal() {
    this.createModal.open = true;
  }

  public closeModal() {
    this.createModal = {
      open: false,
    };
    this.updateModal = {
      open: false,
      id: '',
    };
    this.createPlanForm.reset();
    this.updatePlanForm.reset();
  }

  public deletePlan(plan: any) {
    this.alertService.openDangerConfirmDialog(
      'Desativar',
      `Você tem certeza que deseja desativar o plano ${plan.name}?`,
      'Desativar',
      'Voltar',
      () => {
        this.adminService.deletePlan(plan._id)
          .pipe(first())
          .subscribe(() => {
            this.plans.forEach((p) => {
              if (p._id === plan._id) {
                p.status = 'inactive';
                return;
              }
            });
          });
      }
    );
  }

  public reactivatePlan(plan: any) {
    this.alertService.openSuccessConfirmDialog(
      'Reativar',
      `Você tem certeza que deseja reativar o plano ${plan.name}?`,
      'Reativar',
      'Voltar',
      () => {
        this.adminService.reactivatePlan(plan._id)
          .pipe(first())
          .subscribe(() => {
            this.plans.forEach((p) => {
              if (p._id === plan._id) {
                p.status = 'active';
                return;
              }
            });
          });
      }
    );
  }

}

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
    pf_register_data: new FormControl('', [Validators.required]),
    pf_financial_data: new FormControl('', [Validators.required]),
    pf_behavior_data: new FormControl('', [Validators.required]),
    pf_restrict: new FormControl('', [Validators.required]),
    pf_ondemand: new FormControl('', Validators.required),
    pf_boavista: new FormControl('', Validators.required),
    pj_register_data: new FormControl('', [Validators.required]),
    pj_financial_data: new FormControl('', [Validators.required]),
    pj_behavior_data: new FormControl('', [Validators.required]),
    pj_restrict: new FormControl('', [Validators.required]),
    pj_ondemand: new FormControl('', Validators.required),
    pj_boavista: new FormControl('', Validators.required),
  });

  public updateModal = {
    open: false,
    id: '',
  };

  public updatePlanForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
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

  // public updatePlan() {
  //   this.loading = true;
  //   const planToUpdate = this.updatePlanForm.value;
  //   planToUpdate.id = this.updateModal.id;
  //   this.adminService.savePlan(this.updatePlanForm.value)
  //     .pipe(first())
  //     .subscribe(() => {
  //       this.plans.forEach((r, index) => {
  //         if (r._id === this.updateModal.id) {
  //           this.plans[index] = this.updatePlanForm.value;
  //           this.plans[index].id = planToUpdate.id;
  //           return;
  //         }
  //       });
  //       this.closeModal();
  //       this.loading = false;
  //     });
  // }

  // public editPlan(plan: Plan) {
  //   this.updateModal = {
  //     open: true,
  //     id: plan._id,
  //   };
  //   this.updatePlanForm.get('name').setValue(plan.name);
  //   this.updatePlanForm.get('document').setValue(plan.document);
  //   this.updatePlanForm.get('phone').setValue(plan.phone);
  //   this.updatePlanForm.get('email').setValue(plan.email);
  // }

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
  }

  // public blockPlan(plan: Plan) {
  //   this.adminService.blockPlan(plan._id)
  //     .pipe(first())
  //     .subscribe(() => {
  //       this.plans.forEach((r, index) => {
  //         if (r._id === plan._id) {
  //           this.plans[index].active = false;
  //           return;
  //         }
  //       });
  //     });
  // }

  // public unblockPlan(plan: Plan) {
  //   this.adminService.unblockPlan(plan._id)
  //     .pipe(first())
  //     .subscribe(() => {
  //       this.plans.forEach((r, index) => {
  //         if (r._id === plan._id) {
  //           this.plans[index].active = true;
  //           return;
  //         }
  //       });
  //     });
  // }

  // public deletePlan(plan: Plan) {
  //   this.alertService.openDangerConfirmDialog(
  //     'Excluir',
  //     `Você tem certeza que deseja excluir o usuário ${plan.name}?`,
  //     'Excluir',
  //     'Cancelar',
  //     () => {
  //       this.adminService.deletePlan(plan._id)
  //         .pipe(first())
  //         .subscribe(() => {
  //           this.plans.forEach((r, index) => {
  //             if (r._id === plan._id) {
  //               this.plans.splice(index, 1);
  //               return;
  //             }
  //           });
  //         });
  //     }
  //   );
  // }

}

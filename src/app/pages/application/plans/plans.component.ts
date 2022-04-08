import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  public plans: any[] = [];

  public createModal = {
    open: false,
  };

  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getPlans();
  }

  public choosePlan(plan): void {

  }

  public getPlans(): void {
    this.userService.getPlans()
      .pipe(first())
      .subscribe((plans: any) => {
        this.plans = plans;
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


  public openCreateModal() {
    this.createModal.open = true;
  }

  public closeModal() {
    this.createModal = {
      open: false,
    };
  }

}

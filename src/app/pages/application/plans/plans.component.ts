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
  public currentPlan: any;

  public taxesModal = {
    open: false,
    plan: null,
  };

  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getPlans();
    this.getUserPlan();
  }

  public choosePlan(plan): void {
    this.userService.changeUserPlan(plan._id)
      .pipe(first())
      .subscribe((res: any) => {
        this.currentPlan = plan;
      });
  }

  public getUserPlan() {
    this.userService.getUserPlan()
      .pipe(first())
      .subscribe((plan: any) => {
        this.currentPlan = plan;
      });
  }

  public getPlans(): void {
    this.userService.getPlans()
      .pipe(first())
      .subscribe((plans: any) => {
        this.plans = plans;
      });
  }

  public openTaxesModal(plan: any) {
    this.taxesModal = {
      open: true,
      plan: plan,
    };
  }

  public closeModal() {
    this.taxesModal = {
      open: false,
      plan: null,
    };
  }

}

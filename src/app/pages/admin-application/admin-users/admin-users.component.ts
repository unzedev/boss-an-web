import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, UserConfig } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public users: User[] = [];

  public createConfigModal = {
    open: false,
  };

  public createConfigForm: FormGroup = new FormGroup({
    register_data: new FormControl('', [Validators.required]),
    financial_data: new FormControl('', [Validators.required]),
    behavior_data: new FormControl('', [Validators.required]),
    restrict: new FormControl('', [Validators.required]),
    ondemand: new FormControl('', Validators.required),
    serasa_boavista: new FormControl('', Validators.required),
  });

  public updateConfigModal = {
    open: false,
    id: '',
    register_data: 0,
    financial_data: 0,
    behavior_data: 0,
    restrict: 0,
    ondemand: 0,
    serasa_boavista: 0,
  };

  public updateConfigForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.adminService.getUsers()
      .pipe(first())
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public createConfig() {
    this.adminService.createConfig(this.createConfigForm.value)
      .pipe(first())
      .subscribe((config: UserConfig) => {
        this.closeModal();
      });
  }

  public updateConfig() {
    this.adminService.updateConfig(this.updateConfigForm.value)
      .pipe(first())
      .subscribe((config: UserConfig) => {
        this.closeModal();
      });
  }

  public editUserConfig(user: User) {
    this.adminService.getUserConfig(user.id)
      .pipe(first())
      .subscribe((config: UserConfig) => {
        this.updateConfigModal = {
          open: true,
          id: config.id,
          register_data: config.register_data,
          financial_data: config.financial_data,
          behavior_data: config.behavior_data,
          restrict: config.restrict,
          ondemand: config.ondemand,
          serasa_boavista: config.serasa_boavista,
        };
      });
  }

  public openCreateModal() {
    this.createConfigModal.open = true;
  }

  public closeModal() {
    this.createConfigModal = {
      open: false,
    };
    this.updateConfigModal = {
      open: false,
      id: '',
      register_data: 0,
      financial_data: 0,
      behavior_data: 0,
      restrict: 0,
      ondemand: 0,
      serasa_boavista: 0,
    };
  }

  public approveUser(userToApprove: User) {
    this.adminService.approveUser(userToApprove.id)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.forEach((r, index) => {
          if (r.id === user.id) {
            this.users[index] = user;
            return;
          }
        });
      });
  }

}

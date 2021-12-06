import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];

  public createModal = {
    open: false,
  };

  public createUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  public updateModal = {
    open: false,
    id: '',
  };

  public updateUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getEmployees()
      .pipe(first())
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public createUser() {
    this.loading = true;
    this.userService.createEmployee(this.createUserForm.value)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.push(user);
        this.closeModal();
        this.loading = false;
      });
  }

  public updateUser() {
    this.loading = true;
    const userToUpdate = this.updateUserForm.value;
    userToUpdate.id = this.updateModal.id;
    this.userService.saveEmployee(this.updateUserForm.value)
      .pipe(first())
      .subscribe(() => {
        this.users.forEach((r, index) => {
          if (r._id === this.updateModal.id) {
            this.users[index] = this.updateUserForm.value;
            this.users[index].id = userToUpdate.id;
            return;
          }
        });
        this.closeModal();
        this.loading = false;
      });
  }

  public editUser(user: User) {
    this.updateModal = {
      open: true,
      id: user._id,
    };
    this.updateUserForm.get('name').setValue(user.name);
    this.updateUserForm.get('document').setValue(user.document);
    this.updateUserForm.get('phone').setValue(user.phone);
    this.updateUserForm.get('email').setValue(user.email);
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
  }

  public blockUser(user: User) {
    this.userService.blockEmployee(user._id)
      .pipe(first())
      .subscribe(() => {
        this.users.forEach((r, index) => {
          if (r._id === user._id) {
            this.users[index].active = false;
            return;
          }
        });
      });
  }

  public unblockUser(user: User) {
    this.userService.unblockEmployee(user._id)
      .pipe(first())
      .subscribe(() => {
        this.users.forEach((r, index) => {
          if (r._id === user._id) {
            this.users[index].active = true;
            return;
          }
        });
      });
  }

  public deleteUser(user: User) {
    this.alertService.openDangerConfirmDialog(
      'Excluir',
      `Você tem certeza que deseja excluir o usuário ${user.name}?`,
      'Excluir',
      'Cancelar',
      () => {
        this.userService.deleteEmployee(user._id)
          .pipe(first())
          .subscribe(() => {
            this.users.forEach((r, index) => {
              if (r._id === user._id) {
                this.users.splice(index, 1);
                return;
              }
            });
          });
      }
    );
  }

}

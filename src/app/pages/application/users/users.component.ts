import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
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
    this.userService.saveUser(this.updateUserForm.value)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.forEach((r, index) => {
          if (r.id === user.id) {
            this.users[index] = user;
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
      id: user.id,
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

}

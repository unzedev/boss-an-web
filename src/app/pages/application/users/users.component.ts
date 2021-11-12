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
    name: '',
    document: '',
    email: '',
    phone: '',
    password: '',
  };

  public updateUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

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
    this.userService.createEmployee(this.createUserForm.value)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.push(user);
        this.closeModal();
      });
  }

  public updateUser() {
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
      });
  }

  public editUser(user: User) {
    this.updateModal = {
      open: true,
      id: user.id,
      name: user.name,
      document: user.document,
      email: user.email,
      phone: user.phone,
      password: '',
    };
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
      name: '',
      document: '',
      email: '',
      phone: '',
      password: '',
    };
  }

}

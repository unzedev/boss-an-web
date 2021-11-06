import { Component, OnInit } from '@angular/core';
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
    name: '',
    document: '',
    email: '',
    phone: '',
    password: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  };

  public updateModal = {
    open: false,
    id: '',
    name: '',
    document: '',
    email: '',
    phone: '',
    password: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  };

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
    const data = this.createModal;
    this.userService.createUser(data)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.push(user);
        this.closeModal();
      });
  }

  public updateUser() {
    const data = this.updateModal;
    this.userService.saveUser(data)
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
      address: {
        street: user.address.street,
        number: user.address.number,
        complement: user.address.complement,
        neighborhood: user.address.neighborhood,
        city: user.address.city,
        state: user.address.state,
      },
    };
  }

  public openCreateModal() {
    this.createModal.open = true;
  }

  public closeModal() {
    this.createModal = {
      open: false,
      name: '',
      document: '',
      email: '',
      phone: '',
      password: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
    };
    this.updateModal = {
      open: false,
      id: '',
      name: '',
      document: '',
      email: '',
      phone: '',
      password: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
    };
  }

}

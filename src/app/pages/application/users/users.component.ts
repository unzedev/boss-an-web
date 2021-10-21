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
    title: '',
  };

  public updateModal = {
    open: false,
    title: '',
    id: '',
  };

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers()
      .pipe(first())
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public createUser() {
    const data: User = {
      title: this.createModal.title,
    };
    this.userService.createUser(data)
      .pipe(first())
      .subscribe((user: User) => {
        this.users.push(user);
        this.closeModal();
      });
  }

  public updateUser() {
    const data: User = {
      title: this.updateModal.title,
      id: this.updateModal.id,
    };
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
      title: user.title,
      id: user.id,
    };
  }

  public openCreateModal() {
    this.createModal.open = true;
  }

  public closeModal() {
    this.createModal = {
      open: false,
      title: '',
    };
    this.updateModal = {
      open: false,
      title: '',
      id: '',
    };
  }

}

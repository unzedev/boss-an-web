import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public invoices: any[] = [];

  public resultModal = {
    open: false,
  };

  public userRole: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUser().role;
    if (this.userRole === 'user') {
      this.getInvoices();
    } else {
      this.getMyInvoices();
    }
  }

  private getMyInvoices(): void {
    this.userService.getUserInvoices()
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices;
      });
  }

  private getInvoices(): void {
    this.userService.getUserInvoices()
      .pipe(first())
      .subscribe((invoices: any) => {
        this.invoices = invoices;
      });
  }

  public closeModal() {
    this.resultModal = {
      open: false,
    };
  }

}

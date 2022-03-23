import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public invoices: any[] = [];

  public resultModal = {
    open: false,
    summary: [],
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

  public getSummary(invoice: any) {
    this.resultModal = {
      open: true,
      summary: invoice.summary,
    };
  }

  public closeModal() {
    this.resultModal = {
      open: false,
      summary: [],
    };
  }

}

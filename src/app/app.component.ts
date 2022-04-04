import { Component } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  loading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((value) => {
      this.loading = value;
    });
  }
}

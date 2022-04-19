import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  loading: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.isLoading.pipe(delay(0)).subscribe((value) => {
      this.loading = value;
    });
  }
}

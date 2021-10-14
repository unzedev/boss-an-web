import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CheckPad } from 'src/app/models/check-pad.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { CheckPadService } from 'src/app/services/check-pad/check-pad.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-check-pads',
  templateUrl: './check-pads.component.html',
  styleUrls: ['./check-pads.component.scss']
})
export class CheckPadsComponent implements OnInit {

  public checkPads: CheckPad[] = [];
  
  public restaurants: Restaurant[] = [];
  public selectedRestaurantId: string;

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
    private checkpadService: CheckPadService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  private getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .pipe(first())
      .subscribe((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        this.selectedRestaurantId = this.restaurants[0].id;
        this.getCheckPads();
      });
  }

  public selectRestaurant(event) {
    this.selectedRestaurantId = event.target.value;
    this.getCheckPads();
  }

  private getCheckPads(): void {
    this.checkpadService.getCheckPads(this.selectedRestaurantId)
      .pipe(first())
      .subscribe((checkPads: CheckPad[]) => {
        this.checkPads = checkPads;
      });
  }

  public createCheckPad() {
    const data: CheckPad = {
      title: this.createModal.title,
      restaurantId: this.selectedRestaurantId,
    };
    this.checkpadService.createCheckPad(data)
      .pipe(first())
      .subscribe((checkPad: CheckPad) => {
        this.checkPads.push(checkPad);
      });
  }

  public editCheckPad(checkPad: CheckPad) {
    this.updateModal = {
      open: true,
      title: checkPad.title,
      id: checkPad.id,
    };
  }

  public deleteCheckPad(checkPad: CheckPad) {
    this.checkpadService.deleteCheckPad(checkPad.id)
      .pipe(first())
      .subscribe(() => {
        this.checkPads.splice(this.checkPads.indexOf(checkPad), 1);
      });
  }

  public updateCheckPad() {
    const data: CheckPad = {
      title: this.updateModal.title,
      id: this.updateModal.id,
      restaurantId: this.selectedRestaurantId,
    };
    this.checkpadService.saveCheckPad(data)
      .pipe(first())
      .subscribe((checkPad: CheckPad) => {
        this.checkPads.forEach((r, index) => {
          if (r.id === checkPad.id) {
            this.checkPads[index] = checkPad;
            return;
          }
        });
        this.closeModal();
      });
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

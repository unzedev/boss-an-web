import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  public restaurants: Restaurant[] = [];

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
      });
  }

  public createRestaurant() {
    const data: Restaurant = {
      title: this.createModal.title,
    };
    this.restaurantService.createRestaurant(data)
      .pipe(first())
      .subscribe((restaurant: Restaurant) => {
        this.restaurants.push(restaurant);
        this.closeModal();
      });
  }

  public updateRestaurant() {
    const data: Restaurant = {
      title: this.updateModal.title,
      id: this.updateModal.id,
    };
    this.restaurantService.saveRestaurant(data)
      .pipe(first())
      .subscribe((restaurant: Restaurant) => {
        this.restaurants.forEach((r, index) => {
          if (r.id === restaurant.id) {
            this.restaurants[index] = restaurant;
            return;
          }
        });
        this.closeModal();
      });
  }

  public editRestaurant(restaurant: Restaurant) {
    this.updateModal = {
      open: true,
      title: restaurant.title,
      id: restaurant.id,
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

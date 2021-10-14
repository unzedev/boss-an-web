import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Restaurant } from 'src/app/models/restaurant.model';
import { MenuItem } from 'src/app/models/menu-item.model';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { MenuItemService } from 'src/app/services/menu-item/menu-item.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  public menuItems: MenuItem[] = [];
  
  public restaurants: Restaurant[] = [];
  public selectedRestaurantId: string;

  public createModal = {
    open: false,
    title: '',
    description: '',
    amount: null,
  };

  public updateModal = {
    open: false,
    id: '',
    title: '',
    description: '',
    amount: null,
  };

  constructor(
    private menuItemService: MenuItemService,
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
        this.getMenuItems();
      });
  }

  public selectRestaurant(event) {
    this.selectedRestaurantId = event.target.value;
    this.getMenuItems();
  }

  private getMenuItems(): void {
    this.menuItemService.getMenuItems(this.selectedRestaurantId)
      .pipe(first())
      .subscribe((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
      });
  }

  public createMenuItem() {
    const data: MenuItem = {
      title: this.createModal.title,
      description: this.createModal.description,
      amount: this.createModal.amount,
      restaurantId: this.selectedRestaurantId,
    };
    this.menuItemService.createMenuItem(data)
      .pipe(first())
      .subscribe((menuItem: MenuItem) => {
        this.menuItems.push(menuItem);
        this.closeModal();
      });
  }

  public editMenuItem(menuItem: MenuItem) {
    this.updateModal = {
      open: true,
      title: menuItem.title,
      id: menuItem.id,
      description: menuItem.description,
      amount: menuItem.amount,
    };
  }

  public deleteMenuItem(menuItem: MenuItem) {
    this.menuItemService.deleteMenuItem(menuItem.id)
      .pipe(first())
      .subscribe(() => {
        this.menuItems.splice(this.menuItems.indexOf(menuItem), 1);
      });
  }

  public updateMenuItem() {
    const data: MenuItem = {
      id: this.updateModal.id,
      title: this.updateModal.title,
      description: this.updateModal.description,
      amount: this.updateModal.amount,
      restaurantId: this.selectedRestaurantId,
    };
    this.menuItemService.saveMenuItem(data)
      .pipe(first())
      .subscribe((menuItem: MenuItem) => {
        this.menuItems.forEach((r, index) => {
          if (r.id === menuItem.id) {
            this.menuItems[index] = menuItem;
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
      description: '',
      amount: null,
    };
    this.updateModal = {
      open: false,
      id: '',
      title: '',
      description: '',
      amount: null,
    };
  }

}

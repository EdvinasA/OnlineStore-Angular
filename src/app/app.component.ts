import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CartService} from "./cart/cart.service";
import {Cart} from "./cart/cart";
import { Subscription} from "rxjs";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  template:`
    <mat-toolbar *ngIf="isLogged === 'true'">
      <button mat-button style="font-size: 30px" routerLink="/welcome">
      <span>{{title}}</span>
      </button>
      <button mat-button class="example-icon" routerLink="/products" style="font-size: large; font-weight: bold">
        <span>Product list</span>
      </button>
      <button mat-button *ngIf="role !== 'ADMIN'" class="example-icon" routerLink="/cart" style="font-size: large; font-weight: bold"
              [matBadge]="cartSize" matBadgePosition="below">
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button mat-button  *ngIf="role !== 'ADMIN' "  class="example-icon" routerLink="/orders" style="font-size: large; font-weight: bold">
        <span>Orders</span>
      </button>

      <span style="flex: 30 15 auto"></span>

      <button mat-button class="example-icon" [matMenuTriggerFor]="menuForEveryone">
        <span>Currently logged in: {{currentUser}}</span>
      </button>
      <mat-menu #menuForEveryone="matMenu">
        <button mat-menu-item [routerLink]="['/profile/'+ userId]">
          <mat-icon>how_to_reg</mat-icon>
          <span>Profile</span>
        </button>
      </mat-menu>

      <button mat-button class="example-icon" routerLink="/orders" style="font-size: large; font-weight: bold"
              routerLink="/login" (click)="loginService.changeLoginStatusToFalse()">
        <span>Log Out</span>
      </button>
      <button mat-icon-button [matMenuTriggerFor]="menuForAdmin" *ngIf="role === 'ADMIN'" style="flex: 1 1 auto">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menuForAdmin="matMenu">
        <button mat-menu-item routerLink="/storage">
          <mat-icon>storage</mat-icon>
          <span>Storage</span>
        </button>
        <button mat-menu-item routerLink="/add-product">
          <mat-icon> add_comment</mat-icon>
          <span>Add product</span>
        </button>
        <button mat-menu-item routerLink="/users">
          <mat-icon>supervised_user_circle</mat-icon>
          <span>Users</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  <div class="container">
    <br>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Digital sales outlet';
  carts: Cart[] = [];
  role!: string | null;
  isLogged: string | null = 'false';
  cartSize!: number;
  currentUser!: string | null;
  subscription!: Subscription;
  userId!: string | null;
  errorMessage = "";
  constructor(private cartService: CartService,
              public loginService: LoginService) {
  }


  ngOnInit(): void {

    this.subscription = this.loginService.currentUserIdStatus.subscribe(setId => this.userId = setId)
    this.userId = sessionStorage.getItem('userId');
    this.subscription = this.loginService.currentLoggedStatus.subscribe(statusLogged => this.isLogged = statusLogged);
    this.isLogged = sessionStorage.getItem('isLogged');
    this.subscription = this.loginService.currentUserRoleStatus.subscribe(currentUser => this.role = currentUser);
    this.role = sessionStorage.getItem('role');
    this.subscription = this.loginService.currentUserNameStatus.subscribe(currentUserName => this.currentUser = currentUserName);
    this.currentUser = sessionStorage.getItem('userName');
    this.cartService.getCart(this.userId).subscribe( {
      next: data => {
        this.carts = data,
          this.cartSize = this.getCartQuantity(data);
      },
      error: err => this.errorMessage = err
    });

  }



  public getCartQuantity(cart: Cart[]): number {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].quantity;
    }
    return sum;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import { OrdersService} from "./orders.service";
import {IOrder} from "./interfaces/order-interface.model";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  pageTitle = "Orders";
  order: IOrder[] = [];
  errorMessage = "Somethings Wrong"
  subscription!: Subscription;
  userId!: string | null;
  orderTotals: any;

  constructor(private orderService: OrdersService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscription = this.loginService.currentUserIdStatus.subscribe(setId => this.userId = setId)
    console.log(this.userId);
    this.userId = sessionStorage.getItem('userId');
    this.orderService.getOrdersTotalCost(this.userId).subscribe(data => {
      this.orderTotals = data;
      console.log(this.orderTotals)
    });

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}

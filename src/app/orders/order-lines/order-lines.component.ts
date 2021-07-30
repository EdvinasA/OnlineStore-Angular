import {Component, Input, OnInit} from '@angular/core';
import { OrdersService } from "../orders.service";
import {IOrder} from "../interfaces/order-interface.model";

@Component({
  selector: 'app-order-lines',
  templateUrl: './order-lines.component.html',
  styleUrls: ['./order-lines.component.css']
})
export class OrderLinesComponent implements OnInit {
  pageTitle = "Order items";
  @Input() order!: IOrder;
  orderLines: any;
  orderTotalCost = 0;
  errorMessage = 'Something is wrong';

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.orderService.getOrderLines(this.order.id).subscribe(data => {
      this.orderLines = data;
    });

    // @ts-ignore
    this.orderService.getOrderTotalCost(this.order.id).subscribe(data => {
      this.orderTotalCost = data;
    });
  }


}

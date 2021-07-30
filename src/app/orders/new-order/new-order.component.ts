import { Component, OnInit } from '@angular/core';
import { OrdersService} from "../orders.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../interfaces/order.model";
import {DatePipe} from "@angular/common";

@Component({
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  providers: [DatePipe]
})
export class NewOrderComponent implements OnInit {

  order: any;
  date = new Date();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrdersService,
              private datePipe: DatePipe) {
    this.order = new class extends Order {};
    // @ts-ignore
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  onSubmit() {
    this.orderService.save(this.order).subscribe(result => this.createOrderLines(result.id))}

  createOrderLines(createdOrderId: number){
    this.orderService.createOrderLinesFromCart(createdOrderId).subscribe(result => this.gotoOrdersList(createdOrderId));
  }

  gotoOrdersList(id: number) {
    this.router.navigate(['/order/'+id]);
  }

  ngOnInit(): void {
  }
}

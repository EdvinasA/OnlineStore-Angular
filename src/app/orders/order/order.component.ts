import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "../orders.service";
import {Order} from "../interfaces/order.model";
import {IOrder} from "../interfaces/order-interface.model";



@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  pageTitle = "Order"
  errorMessage = ""
  order: IOrder | undefined;

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getOrder(id);
    }
  }

  getOrder(id: number): void {
    this.ordersService.getOrder(id).subscribe({
      next: orders => this.order = orders,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/orders']);
  }
}

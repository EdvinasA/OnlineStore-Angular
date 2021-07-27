import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from "./interfaces/order.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IOrder} from "./interfaces/order-interface.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.apiURL;
  private getOrdersUrl = this.baseUrl + "purchase/order/";
  private createOrderUrl = this.baseUrl + "purchase/order/";
  private cartOrderLineUrl = this.baseUrl + 'purchase/order/';
  private cartTotalCostUrl = this.baseUrl + 'purchase/order/totals/';
  private userId = sessionStorage.getItem('userId');
  constructor(private http: HttpClient) {
  }

  public getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.getOrdersUrl + this.userId);
  }

  public getOrder(id: number): Observable<IOrder | undefined> {
    return this.getOrders()
      .pipe(
        map((orders: IOrder[]) => orders.find(p => p.id === id))
      );
  }

  public save(order: Order) {
    return this.http.post<any>(this.createOrderUrl + this.userId, order);
  }

  getOrderLines(id: string){
    return this.http.get(this.cartOrderLineUrl + id + '/lines');
  }

  getOrdersTotalCost(userId: string | null){
    return this.http.get(this.cartTotalCostUrl + userId);
  }

  getOrderTotalCost(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'purchase/order/'+id+'/total');
  }

  public createOrderLinesFromCart(orderId: number) {
    return this.http.post<any>(this.baseUrl + "purchase/order/lines/moveFromCart?purchase_order_id="+orderId, "{purchase_order_id: orderId}");
  }

}

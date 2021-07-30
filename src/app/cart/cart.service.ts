import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Cart} from "./cart";
import {IProduct} from "../products/product";
import {CartModelToCart} from "./cart.model-to-cart";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService{

  private baseUrl = environment.apiURL;
  private getAllProductsUrl = this.baseUrl + 'cart/';
  private getTotalPriceUrl = this.baseUrl + 'cart/getTotalPrice/';
  private addToCartUrl = this.baseUrl + 'cart/';
  private removeFromCartProductUrl = this.baseUrl + 'cart/';
  private changeProductQuantityInCartUrl = this.baseUrl + 'cart';


  constructor(private http: HttpClient) {}

  public deleteCartEntryById(id: number) {
    return this.http.delete(this.removeFromCartProductUrl + id);
  }

  getCart(userId: string | null): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.getAllProductsUrl + userId);
  }

  addProductToCart(product: IProduct | undefined, userId: string | null) {
    var newProduct = {
      productId: product!.id,
      quantity: 1
    }
      return this.http.post<CartModelToCart>(this.addToCartUrl + userId, newProduct);
  }

  updateProductOnAdd(selectedProduct: Cart): void {
    selectedProduct.quantity += 1;
  }

  updateProductOnSubtract(selectedProduct: Cart): void {
    if (selectedProduct.quantity <= 0) {
      return;
    }
    selectedProduct.quantity -= 1;
  }

  addQuantityToProduct(cart: Cart) {
    return this.http.put<Cart>(this.changeProductQuantityInCartUrl, cart);
  }

  subtractQuantityToProduct(cart: Cart) {
    return this.http.put<Cart>(this.changeProductQuantityInCartUrl, cart);
  }

  getTotalPrice(userId: string | null): Observable<number> {
    return this.http.get<number>(this.getTotalPriceUrl + userId);
  }

}

import {IProduct} from "./product";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Products} from "./products";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiURL;
  private getProductUrl = this.baseUrl + "product/get-all";
  private createProductUrl = this.baseUrl + "product";
  private deleteProductUrl = this.baseUrl + "product/delete/";
  private updateProductUrl = this.baseUrl + "product/";
  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getProductUrl);
  }

  public save(product: Products) {
    return this.http.post<Products>(this.createProductUrl, product);
  }

  public updateProduct(product: Products) {
    let newProduct = {
      imageUrl: product.imageUrl,
      title:product.title,
      price: product.price,
      type: product.type,
      description: product.description
    }
    return this.http.put<IProduct>(this.updateProductUrl + product.id ,newProduct);
  }

  public getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.id === id))
      );
  }

  public deleteProductById(id: number) {
    return this.http.delete(this.deleteProductUrl + id);
  }
}

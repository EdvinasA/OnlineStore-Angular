import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Storage} from "./storage";
import {IStorage} from "./storage.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private baseUrl = environment.apiURL;
  private getQuantityByDateUrl = this.baseUrl + "product/get-all/quantity";
  private getQuantityByIdAndDateUrl = this.baseUrl + "product/{id}/quantity";
  private postProductQuantityUrl = this.baseUrl + "product/quantity";
  private getProductQuantityUrl = this.baseUrl + "product/quantity";

  constructor(private http: HttpClient) { }

  public getAllProductQuantityOnDate(date: Date){
    return this.http.get(this.getQuantityByDateUrl + "?date="+date.toString())
  }

  public getAllProductQuantity(): Observable<IStorage[]> {
    return this.http.get<IStorage[]>(this.getProductQuantityUrl);
  }

  public getQuantityByProductIdOnDate(date: Date, id: number){
    return this.http.get(this.getQuantityByIdAndDateUrl + "?date="+date+"&productId="+id);
  }

  public postProductQuantity(storage: Storage){
    return this.http.post(this.postProductQuantityUrl, storage);
  }

}

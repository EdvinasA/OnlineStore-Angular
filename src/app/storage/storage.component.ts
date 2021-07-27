import { Component, OnInit } from '@angular/core';
import {ProductService} from "../products/product.service";
import {IProduct} from "../products/product";
import {DatePipe} from "@angular/common";
import {StorageService} from "./storage.service";
import {Storage} from "./storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [DatePipe]
})
export class StorageComponent implements OnInit {
  pageTitle = "Product quantities"
  errorMessage: string = "";
  products!: IProduct[];
  storages: any;
  //storageDTO!: Storage;
  date = new Date();

  constructor(private productService: ProductService,
              private storageService: StorageService,
              private router: Router,
              private datePipe: DatePipe) {
    // @ts-ignore
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getAllProductQuantityOnDate();
  }

  getAllProductQuantityOnDate()
  {
    this.storageService.getAllProductQuantityOnDate(this.date).subscribe(data => {
      this.storages = data;
    })
}

  updateStorage(product_id: number, quantiy: number){
     var storageDTO: Storage = new Storage();
     storageDTO.productId = product_id;
     storageDTO.quantity = quantiy;
     storageDTO.date = this.date;

    this.storageService.postProductQuantity(storageDTO).subscribe(result => this.ngOnInit())
  }

  getQuantityByProductIdOnDate(product_id: number){
    this.storageService.getQuantityByProductIdOnDate(this.date, product_id).subscribe(result => console.log(result))
  }

}

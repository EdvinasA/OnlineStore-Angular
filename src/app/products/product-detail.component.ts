import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartService} from "../cart/cart.service";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct | undefined;
  subscription!: Subscription;
  private userId!: string | null;
  role!: string | null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private _snackBar: MatSnackBar,
              private cartService: CartService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.subscription = this.loginService.currentUserIdStatus.subscribe(setId => this.userId = setId)
    this.userId = sessionStorage.getItem('userId');
    this.subscription = this.loginService.currentUserRoleStatus.subscribe(setRole => this.role = setRole)
    this.role = sessionStorage.getItem('role');
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  openSnackBarOnAdd() {
    this._snackBar.open('Product added to cart', 'Dismiss', {
      duration: 1000,
      panelClass: ["custom-style"]
    });
  }

  addToCartProduct(product: IProduct | undefined): void {
    this.openSnackBarOnAdd();
    this.cartService.addProductToCart(product, this.userId).subscribe({
      next: message => {
      },
      error: err => this.errorMessage = err
    });
  }
}

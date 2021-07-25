import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { Subscription } from "rxjs";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Products} from "./products";
import {CartService} from "../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductEditingComponent} from "./product-editing.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../login/login.service";


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle = "Product list";
  showImage:boolean = true;
  errorMessage: string = "";
  private _listFilter: string = '';
  sub: Subscription | undefined;
  p: number = 1;
  role = sessionStorage.getItem('role');
  subscription!: Subscription;
  private userId!: string | null;


  get listFilter(): string {
    return this._listFilter;
}
  set listFilter(value: string){
    this._listFilter = value
    console.log('In setter: ',value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  displayedColumns: string[] = ['imageUrl', 'title', 'id', 'price', 'add','delete', 'update'];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,
              private loginService: LoginService
  ) {
  }

  updateDisplayedColumns(): string[] {
    if (this.role == "ADMIN") {
      return this.displayedColumns = ['imageUrl', 'title', 'id', 'price', 'delete', 'update'];
    } else {
      return this.displayedColumns = ['imageUrl', 'title', 'id', 'price', 'add'];
    }
  }

  openSnackBarOnAdd() {
    this._snackBar.open('Product added to cart', 'Dismiss', {
      duration: 1000,
      panelClass: ["custom-style"]
    });
  }

  openSnackBarOnDelete() {
    this._snackBar.open('Product removed from product list', 'Dismiss', {
      duration: 1000,
      panelClass: ["custom-style"]
    });
  }

  openDialog(product: Products) {
    const dialogRef = this.dialog.open(ProductEditingComponent, {
      width: '500px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
        this.updateRowData(result.data);
    });
  }

  updateRowData(row_obj: Products){
    this.productService.updateProduct(row_obj).subscribe({
      next: message => {
      },
      error: err => this.errorMessage = err
    });
    this.filteredProducts = this.filteredProducts.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.title = row_obj.title;
        value.price = row_obj.price;
        value.description = row_obj.description;
      }
      return true;
    });
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
    product.title.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onDelete(id: number): void {
    this.openSnackBarOnDelete();
    this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
    this.productService.deleteProductById(id)
      .subscribe({
        next: message => {
          message = "Delete succesfull"
        },
        error: err => this.errorMessage = err
      });
  }

  addToCartProduct(product: Products): void {
    this.openSnackBarOnAdd();
    this.cartService.addProductToCart(product, this.userId).subscribe({
      next: message => {
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    this.listFilter = "";
    this.subscription = this.loginService.currentUserIdStatus.subscribe(setId => this.userId = setId)
    this.userId = sessionStorage.getItem('userId');
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}


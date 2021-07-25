import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Products} from "../products";
import {productType} from "./productType";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  products: Products;
  selectedFile!: File;
  retrievedImage!: any;
  base64Data!: any;
  retrieveResponse!: any;
  message!: string;
  imageName!: any;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              public fb: FormBuilder,
              private httpClient: HttpClient) {
              this.products = new class extends Products {};
  }


  productTypes: productType[] = [
    { id: "COMPUTER", title: "Computer" },
    { id: "MONITOR", title: "Monitor" },
    { id: "OTHERS", title: "Others" }
  ];

  onSubmit() {
    console.log(this.productService.save(this.products).subscribe(result => this.gotoProductsList()));
  }

  gotoProductsList() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
  }

  public onFileChanged(event: any) {

    this.selectedFile = event.target.files[0];

  }

  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:8080/product/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
  );
  }
  getImage() {
    this.httpClient.get('http://localhost:8080/product/image/get/' + this.imageName)
      .subscribe(
    res => {
      this.retrieveResponse = res;
      this.base64Data = this.retrieveResponse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    }
  );
  }


}

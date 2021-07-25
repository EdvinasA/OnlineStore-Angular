import {Component, Inject, OnInit, Optional, ViewChild} from "@angular/core";
import {MatTable} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {IProduct} from "./product";
import {Products} from "./products";


@Component({
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductEditingComponent implements OnInit{

  local_data:Products;

  constructor(
    public dialogRef: MatDialogRef<ProductEditingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Products) {
    console.log(data);
    this.local_data = {...data};
  }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}

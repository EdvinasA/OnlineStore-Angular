import {IProduct} from "../products/product";

export interface IStorage {
  id: number;
  product: IProduct;
  quantity: number;
  date: Date;
}

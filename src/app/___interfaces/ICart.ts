import {IProduct} from "./IProduct";

export interface ICart {
  id: number
  productList: {count: number, product: IProduct}[]
  totalPrice: number
}

import {IProduct} from "./IProduct";

export interface ICart {
  accountId: number
  productList: {count: number, product: IProduct}[]
  totalPrice: number
}

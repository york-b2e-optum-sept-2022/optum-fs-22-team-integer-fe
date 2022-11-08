import {IProduct} from "./IProduct";

export interface IInvoices {
  id: number
  cartId: number
  dateOfPurchase: Date
  productList: {count: number, product: IProduct}[]
  totalPrice: number
}

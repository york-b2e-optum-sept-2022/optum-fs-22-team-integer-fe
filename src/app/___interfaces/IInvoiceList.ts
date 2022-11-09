import {IProduct} from "./IProduct";

export interface IInvoiceList {
  id: number
  accountId: number
  dateOfPurchase: Date
  purchaseList: {count: number, name: string, price: number}[]
  totalPrice: number
}

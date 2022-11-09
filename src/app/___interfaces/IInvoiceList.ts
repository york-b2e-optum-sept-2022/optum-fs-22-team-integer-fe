import {IProduct} from "./IProduct";

export interface IInvoiceList {
  id: number | null
  accountId: number
  purchaseDate: Date
  purchaseList: {count: number, name: string, price: number}[]
  totalPrice: number
}

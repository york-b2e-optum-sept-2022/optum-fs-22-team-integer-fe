import {ICategoryList} from "./ICategoryList";

export interface IProduct {
  id: number
  discontinuedStatus: boolean
  storeQuantity: number
  MSRP: number
  currentPrice: number

  mapStartDate: Date
  mapEndDate: Date

  priceStartDate: Date
  priceEndDate: Date
  price: number


  saleStartDate: number
  saleEndDate: number
  salePercent: number

  description: string
  image: string
  quantitiesAtCost: number
  availableOnDate: Date
  categories: ICategoryList[]
}

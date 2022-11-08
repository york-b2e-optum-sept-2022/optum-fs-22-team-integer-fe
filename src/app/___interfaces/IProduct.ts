import {ICategoryList} from "./ICategoryList";

export interface IProduct {
  id: number
  isDiscontinued: boolean
  storeQuantity: number
  msrp: number
  currentPrice: number

  mapStartDate: Date
  mapEndDate: Date

  priceStartDate: Date
  priceEndDate: Date
  price: number


  saleStartDate: number
  saleEndDate: number
  salePercentOff: number

  description: string
  image: string
  quantityAtCost: number
  dateAvailableOn: Date
  categoryList: ICategoryList[]
}

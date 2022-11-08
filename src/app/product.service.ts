import { Injectable } from '@angular/core';
import {IProduct} from "./___interfaces/IProduct";
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public $productList = new BehaviorSubject<IProduct[]>([{
    id: 1,
    isDiscontinued: false,
    storeQuantity: 10,
    msrp: 30,
    currentPrice: 35,
    mapStartDate: new Date(),
    mapEndDate: new Date(),
    priceStartDate: new Date(),
    priceEndDate: new Date(),
    price: 40,
    saleStartDate: new Date(),
    saleEndDate: new Date(),
    salePercentOff: 5,
    description: "shoe",
    image: "https://functionjunction.com/wp-content/uploads/2021/04/m_3778-200x200.jpg",
    quantityAtCost: 6,
    dateAvailableOn: new Date(),
    categoryList: ["footwear"]
  },
    {
      id: 1,
      isDiscontinued: false,
      storeQuantity: 10,
      msrp: 30,
      currentPrice: 35,
      mapStartDate: new Date(),
      mapEndDate: new Date(),
      priceStartDate: new Date(),
      priceEndDate: new Date(),
      price: 40,
      saleStartDate: new Date(),
      saleEndDate: new Date(),
      salePercentOff: 5,
      description: "shoe",
      image: "https://functionjunction.com/wp-content/uploads/2021/04/m_3778-200x200.jpg",
      quantityAtCost: 6,
      dateAvailableOn: new Date(),
      categoryList: ["footwear"]
    }]);

  constructor(private httpService: HttpService) {
   this.getProductList();
  }


  public getProductList() {
    this.httpService.getAllProducts().pipe(first()).subscribe({
      next: (productList) => {
        this.$productList.next(productList);
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }



}

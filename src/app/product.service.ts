import { Injectable } from '@angular/core';
import {IProduct} from "./___interfaces/IProduct";
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";
import {ICategoryList} from "./___interfaces/ICategoryList";

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
  }]);

  public $categoryList = new BehaviorSubject<ICategoryList[]>([{
    id: 0,
    name: "pets"
  },
  ]);

  constructor(private httpService: HttpService) {
   this.getProductList();
   this.getAllCategoriesList();
  }


  public getProductList() {
    this.httpService.getAllProducts().pipe(first()).subscribe({
      next: (productList) => {
        productList.sort((a, b) => a.id - b.id)
        this.$productList.next(productList);
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }


  updateProduct(product: IProduct) {
    this.httpService.updateProduct(product).pipe(first()).subscribe({
      next: (product) => {
        this.getProductList()
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }

  //getAllCategories()
  public getAllCategoriesList() {
    this.httpService.getAllCategories().pipe(first()).subscribe({
      next: (categoryList) => {
        categoryList.sort((a, b) => a.id - b.id)
        this.$categoryList.next(categoryList);
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }

  public updateCategoryName(category: ICategoryList) {
    this.httpService.updateCategory(category).pipe(first()).subscribe({
      next: (category) => {
        this.getAllCategoriesList()
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }

  public createNewCategory(category: ICategoryList) {
    this.httpService.createCategory(category).pipe(first()).subscribe({
      next: (category) => {
        this.getAllCategoriesList()
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }

}

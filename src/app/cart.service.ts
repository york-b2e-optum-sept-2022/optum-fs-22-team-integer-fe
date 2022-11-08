import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ICart} from "./___interfaces/ICart";
import {IProduct} from "./___interfaces/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public $cart = new BehaviorSubject<ICart>({
    id: 0,
    productList: [],
    totalPrice: 0
  });

  public $viewCart = new BehaviorSubject<boolean>(false);

  constructor() { }

  addProduct(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    currentCart.totalPrice += product.currentPrice;
    currentCart.productList.push({
      count: 1,
      product: product
    });

    console.log(currentCart);
  }

  viewCart() {
    this.$viewCart.next(true);
  }



}

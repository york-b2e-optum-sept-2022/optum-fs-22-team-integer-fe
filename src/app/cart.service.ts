import { Injectable } from '@angular/core';
import {BehaviorSubject, first} from "rxjs";
import {ICart} from "./___interfaces/ICart";
import {IProduct} from "./___interfaces/IProduct";
import {IInvoices} from "./___interfaces/IInvoices";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public $cart = new BehaviorSubject<ICart>({
    id: 0,
    productList: [],
    totalPrice: 0
  });

  public $invoiceList = new BehaviorSubject<IInvoices[]>([])

  public $viewCart = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService) { }

  addProduct(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    currentCart.totalPrice += product.currentPrice;
    currentCart.productList.push({
      count: 1,
      product: product
    });
    console.log(currentCart);
    this.$cart.next(currentCart)
  }

  viewCart() {
    this.$viewCart.next(true);
  }

  createInvoice(cart: ICart){
    this.httpService.createInvoice(cart).pipe(first()).subscribe({
      next: (invoice) => {
        let newList: IInvoices[] = [...this.$invoiceList.getValue()];
        newList.push(invoice)
        this.$invoiceList.next(newList)
        console.log({
          id: 1,
          cartId: cart.id,
          totalPrice: cart.totalPrice,
          productList: cart.productList,
          dateOfPurchase: new Date(),
          })
      },
      error: (err) => {
        console.error(err);
        // TODO - handle error
      }
    })
  }
}

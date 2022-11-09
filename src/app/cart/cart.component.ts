import { Component, OnInit } from '@angular/core';
import {ICart} from "../___interfaces/ICart";
import {CartService} from "../cart.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: ICart



  constructor(private cartService: CartService) {
    this.cartService.$cart.subscribe(
      cart => this.cart = cart
    )
}

onCheckoutClick(){
    //save invoice
this.cartService.createInvoice(this.cart)

  //update product quantites
  for (let item of this.cart.productList)
    item.product.storeQuantity -= item.count
  //clear cart
    this.cart.productList = []
    this.cart.totalPrice = 0
  this.cartService.$cart.next(this.cart)
  this.cartService.$viewCart.next(false)
  if(this.cart.id = 0)
    this.cartService.$viewInvoices.next(true)
}

  ngOnInit(): void {

  }

}

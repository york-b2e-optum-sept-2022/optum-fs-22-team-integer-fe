import {Component} from '@angular/core';
import {ICart} from "../___interfaces/ICart";
import {CartService} from "../cart.service";
import {ViewService} from "../view.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart!: ICart


  constructor(private cartService: CartService, private viewService: ViewService) {
    this.cartService.$cart.subscribe(
      cart => this.cart = cart
    )
  }

  onCheckoutClick() {
    //save invoice
    this.cartService.createInvoice(this.cart)

    //update product quantites
    for (let item of this.cart.productList)
      item.product.storeQuantity -= item.count
    //TODO: update product table
    //clear cart
    this.cart.productList = []
    this.cart.totalPrice = 0
    this.cartService.$cart.next(this.cart)
    this.viewService.viewClose();
    if (this.cart.accountId === 0)
      this.viewService.viewInvoices();
  }


  onClose() {
    this.viewService.viewCloseCart();
  }

}

import {Component, OnDestroy} from '@angular/core';
import {ICart} from "../___interfaces/ICart";
import {CartService} from "../cart.service";
import {ViewService} from "../view.service";
import {IProduct} from "../___interfaces/IProduct";
import {ProductService} from "../product.service";
import {ICouponCodes} from "../___interfaces/ICouponCodes";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy{

  cart!: ICart
  couponCodeInput: string | null = null
  couponCodeList!: ICouponCodes[]

  onDestroy = new Subject();

  constructor(private cartService: CartService, private viewService: ViewService, private productService: ProductService) {
    this.cartService.$cart.pipe(takeUntil(this.onDestroy)).subscribe(
      cart => {
        cart.productList.sort((a, b) => a.product.id - b.product.id)
        this.cart = cart
      }
    )

    this.cartService.$couponCodeList.subscribe(
      couponList => this.couponCodeList = couponList
    )
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onCheckoutClick() {
    //save invoice
    this.cartService.createInvoice(this.cart)

    //update product quantities
    for (let item of this.cart.productList) {
      item.product.storeQuantity -= item.count
      this.productService.updateProduct(item.product)
    }
    //TODO: update product table
    //clear cart
    this.cart.productList = []
    this.cart.totalPrice = 0
    this.cartService.$cart.next(this.cart)
    this.viewService.viewCloseAll();
    if (this.cart.accountId === 0)
      this.viewService.viewInvoices();
  }

  onMinusClick(product: IProduct) {
    this.cartService.decreaseProductCount(product)
  }

  onRemoveClick(product: IProduct) {
    this.cartService.removeProduct(product)
  }

  onPlusClick(product: IProduct) {
    this.cartService.increaseProductCount(product)
  }

  checkCouponCode() {
    for (let coupon of this.couponCodeList) {
      if (coupon.name === this.couponCodeInput) {
        this.cart.totalPrice *= 1 - coupon.salePercent / 100
        if (coupon.useLimit === 0)
          return
        coupon.useLimit--
      }

    }
  }
}

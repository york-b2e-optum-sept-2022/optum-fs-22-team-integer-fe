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
export class CartComponent implements OnDestroy {

  cart!: ICart
  couponCodeInput: string | null = null
  couponCodeList!: ICouponCodes[]
  couponInvalid: string | null = null
  onDestroy = new Subject();

  constructor(private cartService: CartService, private viewService: ViewService, private productService: ProductService) {
    this.cartService.$cart.pipe(takeUntil(this.onDestroy)).subscribe(
      cart => {
        cart.productList.sort((a, b) => a.product.id - b.product.id)
        this.cart = cart
      }
    )

    this.cartService.$couponCodeList.pipe(takeUntil(this.onDestroy)).subscribe(
      couponList => this.couponCodeList = couponList
    )
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onCheckoutClick() {
    //if coupon, update couponCount
    if (!this.checkCouponCode()) {
      for (let coupon of this.couponCodeList) {
        if (coupon.name === this.couponCodeInput) {
          coupon.useLimit--
        }
      }
    }
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
    this.viewService.viewCloseCart();
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
    if (this.couponCodeList.length === 0) {
      return this.couponInvalid = "No Coupons in Database"
    }
    for (let coupon of this.couponCodeList) {
      if (coupon.name === this.couponCodeInput &&
        new Date(coupon.startDate).getDate() < new Date().getDate() &&
        new Date(coupon.endDate).getDate() > new Date().getDate() &&
        coupon.useLimit > 0) {
        this.cart.totalPrice *= 1 - coupon.salePercent / 100
        this.couponInvalid = null
      } else {
        this.couponInvalid = "Invalid Coupon"
      }
    }
    return this.couponInvalid
  }
}

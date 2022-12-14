import {Injectable} from '@angular/core';
import {BehaviorSubject, first} from "rxjs";
import {ICart} from "./___interfaces/ICart";
import {IProduct} from "./___interfaces/IProduct";
import {IInvoiceList} from "./___interfaces/IInvoiceList";
import {HttpService} from "./http.service";
import {ICouponCodes} from "./___interfaces/ICouponCodes";
import {ViewService} from "./view.service";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public $cart = new BehaviorSubject<ICart>({
    accountId: 0,
    productList: [],
    totalPrice: 0
  });

  public $invoiceList = new BehaviorSubject<IInvoiceList[]>([])

  public $couponCodeList = new BehaviorSubject<ICouponCodes[]>([{
    id: 0,
    name: "VeteransDaySale",
    startDate: new Date(),
    endDate: new Date(),
    useLimit: 1000,
    salePercent: 40
  },
  ]);

  constructor(private httpService: HttpService, private viewService: ViewService) {
    this.getAllInvoices()
    this.getCouponCodes()
  }

  public addProduct(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    const existingProduct = currentCart.productList.find(item => item.product === product)
    if (!existingProduct) {
      currentCart.totalPrice += product.currentPrice;
      currentCart.productList.push({
        count: 1,
        product: product
      });
    } else {
      existingProduct.count++
      currentCart.totalPrice += product.currentPrice
    }
    if (currentCart.accountId !== 0) {
      this.updateCart(currentCart)
      return
    }
    this.$cart.next(currentCart)
  }

  increaseProductCount(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    for (let item of currentCart.productList)
      if (item.product === product)
        item.count++
    this.$cart.next(currentCart)
    this.calculateTotalPrice()
  }

  decreaseProductCount(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    for (let item of currentCart.productList)
      if (item.product === product) {
        if (item.count === 1)
          return
        item.count--
      }
    this.$cart.next(currentCart)
    this.calculateTotalPrice()
  }

  removeProduct(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    let newProductList = currentCart.productList.filter(productList => productList.product !== product)
    currentCart.productList = newProductList
    this.$cart.next(currentCart)
    this.calculateTotalPrice()
  }

  calculateTotalPrice() {
    let currentCart: ICart = {...this.$cart.getValue()};
    let totalPrice = 0
    for (let item of currentCart.productList)
      totalPrice += (item.product.currentPrice * item.count)
    currentCart.totalPrice = totalPrice
    if (currentCart.accountId !== 0) {
      this.updateCart(currentCart)
      return
    }
    this.$cart.next(currentCart)

  }

  getAllInvoices() {
    this.httpService.getAllInvoices().pipe(first()).subscribe(
      {
        next: (invoiceList) => {
          this.$invoiceList.next(invoiceList)
        },
        error: (err) => {
          console.error(err);
          this.viewService.sendHttpErrorMessage()
        }
      }
    )
  }

  getInvoiceByCartId() {
    this.httpService.getInvoicesById(this.$cart.getValue().accountId).pipe(first()).subscribe(
      {
        next: invoiceList => {
          this.$invoiceList.next(invoiceList)
        },
        error: err => {
          console.error(err);
          this.viewService.sendHttpErrorMessage()
        }
      }
    )
  }

  createInvoice(cart: ICart) {
    let listOfPurchases = []
    for (let purchase of cart.productList) {
      listOfPurchases.push(
        {
          count: purchase.count,
          name: purchase.product.description,
          price: purchase.product.currentPrice,
        }
      )
    }
    let invoice: IInvoiceList = {
      id: null,
      totalPrice: cart.totalPrice,
      purchaseDate: new Date(),
      accountId: cart.accountId,
      purchaseList: listOfPurchases
    }

    this.httpService.createInvoice(invoice).pipe(first()).subscribe({
      next: (invoice) => {
        if (invoice.accountId === 0) {
          this.$invoiceList.next([invoice])
          return
        }
        let newList: IInvoiceList[] = [...this.$invoiceList.getValue()];
        newList.push(invoice)
        this.$invoiceList.next(newList)
      },
      error: (err) => {
        console.error(err);
        this.viewService.sendHttpErrorMessage()
      }
    })
  }


  public connectCart(accountId: number) {
    let cart: ICart = this.$cart.getValue()
    cart.accountId = accountId
    this.httpService.createCart(cart).pipe(first())
      .subscribe({
        next: (savedCart) => {
          //cart did not exist, so cart is created
          this.$cart.next(savedCart)
        },
        error: (err) => {
          if (err.status === 409) {
            //cart existed, so existing cart is retrieved
            this.httpService.getCart(accountId).pipe(first())
              .subscribe({
                next: (returnedCart) => {
                  returnedCart.totalPrice += cart.totalPrice
                  for (let item of cart.productList)
                    returnedCart.productList.push(item)
                  this.$cart.next(returnedCart)
                },
                error: (err) => {
                  this.viewService.sendHttpErrorMessage()
                }
              })
          }
          else this.viewService.sendHttpErrorMessage()
        }
      })
  }

  updateCart(cart: ICart) {
    this.httpService.updateCart(cart).pipe(first())
      .subscribe({
        next: cart => {
          this.$cart.next(cart)
        },
        error: err => {
          if (err.status === 500)
          {}
          else this.viewService.sendHttpErrorMessage()
        }
      })
  }

  // COUPON CODES

  getCouponCodes() {
    this.httpService.getAllCouponCodes().pipe(first()).subscribe(
      {
        next: (couponCodeList) => {
          this.$couponCodeList.next(couponCodeList)
        },
        error: (err) => {
          console.error(err);
          this.viewService.sendHttpErrorMessage()
        }
      }
    )
  }

  public createNewCouponCode(couponcode: ICouponCodes) {
    this.httpService.createCouponCode(couponcode).pipe(first()).subscribe({
      next: (category) => {
        this.getCouponCodes()
      },
      error: (err) => {
        console.error(err);
        this.viewService.sendHttpErrorMessage()
      }
    })
  }

  public updateCouponCode(couponcode: ICouponCodes) {
    this.httpService.updateCouponCode(couponcode).pipe(first()).subscribe({
      next: (couponcode) => {
        this.getCouponCodes()
      },
      error: (err) => {
        console.error(err);
        this.viewService.sendHttpErrorMessage()
      }
    })
  }

  public deleteCouponCode(couponCodeId: number) {
    this.httpService.deleteCouponCode(couponCodeId).pipe(first()).subscribe({
      next: (couponCodeId) => {
        this.getCouponCodes()
      },
      error: (err) => {
        console.error(err);
        this.viewService.sendHttpErrorMessage()
      }
    })
  }

}// end of class

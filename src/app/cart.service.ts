import {Injectable} from '@angular/core';
import {BehaviorSubject, first} from "rxjs";
import {ICart} from "./___interfaces/ICart";
import {IProduct} from "./___interfaces/IProduct";
import {IInvoiceList} from "./___interfaces/IInvoiceList";
import {HttpService} from "./http.service";

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

  public $viewCart = new BehaviorSubject<boolean>(false);
  public $viewInvoices = new BehaviorSubject<boolean>(false)

  constructor(private httpService: HttpService) {
    this.getAllInvoices()
  }

  public addProduct(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    const existingProduct = currentCart.productList.find(item => item.product = product)
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
    this.$cart.next(currentCart)
  }

  public viewCart() {
    this.$viewCart.next(true);
  }

  public viewClose() {
    this.$viewCart.next(false);
  }

  getAllInvoices() {
    this.httpService.getAllInvoices().pipe(first()).subscribe(
      {
        next: (invoiceList) => {
          this.$invoiceList.next(invoiceList)
        },
        error: (err) => {
          console.error(err);
          // TODO - handle error
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
        // TODO - handle error
      }
    })
  }


  public connectCart(accountId: number) {
    let cart: ICart = this.$cart.getValue()
    cart.accountId = accountId
    this.httpService.createCart(cart).pipe(first())
      .subscribe({
        next: (savedCart) => {
          this.$cart.next(savedCart)
        },
        error: (err) => {
          if (err.status === 409) {
            this.httpService.getCart(accountId).pipe(first())
              .subscribe({
                next: (returnedCart) => {
                  returnedCart.totalPrice += cart.totalPrice
                  for (let item of cart.productList)
                    returnedCart.productList.push(item)
                  this.$cart.next(returnedCart)
                },
                error: (err) => {
                  //TODO
                }
                })
              }
          }
        })
  }
}

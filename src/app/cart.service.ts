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
    id: 0,
    productList: [],
    totalPrice: 0
  });

  public $invoiceList = new BehaviorSubject<IInvoiceList[]>([])

  public $viewCart = new BehaviorSubject<boolean>(false);
  public $viewInvoices = new BehaviorSubject<boolean>(false)

  constructor(private httpService: HttpService) {
    this.getAllInvoices()
    console.log(this.$invoiceList.getValue())
  }

  public addProduct(product: IProduct) {
    let currentCart: ICart = {...this.$cart.getValue()};
    currentCart.totalPrice += product.currentPrice;
    currentCart.productList.push({
      count: 1,
      product: product
    });
    console.log(currentCart);
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
          console.log(invoiceList)
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
    for(let purchase of cart.productList){
      listOfPurchases.push(
        {
          count: purchase.count,
          name: purchase.product.description,
          price: purchase.product.currentPrice,
        }
      )
    }
    console.log(listOfPurchases)
    let invoice: IInvoiceList  = {
      id: null,
      totalPrice: cart.totalPrice,
      purchaseDate: new Date(),
      accountId: cart.id,
      purchaseList: listOfPurchases
    }

    this.httpService.createInvoice(invoice).pipe(first()).subscribe({
      next: (invoice) => {
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
}

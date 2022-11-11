import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "./___interfaces/IProduct";
import {Observable} from "rxjs";
import {ICart} from "./___interfaces/ICart";
import {IInvoiceList} from "./___interfaces/IInvoiceList";
import {IAccount} from "./___interfaces/IAccount";
import {IAccountNew} from "./___interfaces/IAccountNew";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {

  }
// Account methods
  public login(email: string, password: string): Observable<IAccount> {
    return this.httpClient.get(
      `http://localhost:8080/api/accounts?email=${email}&password=${password}`
    ) as Observable<IAccount>
  }

  public createAccount(account: IAccountNew): Observable<IAccount> {
    return this.httpClient.post(
      "http://localhost:8080/api/accounts", account
    ) as Observable<IAccount>
  }

  public getAllAccounts(): Observable<IAccount[]> {
    return this.httpClient.get(
      "http://localhost:8080/api/accounts"
    ) as Observable<IAccount[]>
  }

  public updateAccount(account: IAccount): Observable<IAccount>{
    return this.httpClient.put(
      "http://localhost:8080/api/accounts", account
    ) as Observable<IAccount>
  }

  public deleteAccount(accountId: number): Observable<IAccount>{
    return this.httpClient.delete(
      `http://localhost:8080/api/accounts/${accountId}`
    ) as Observable<IAccount>
  }

// Product methods
  public createProduct(product: IProduct): Observable<IProduct>{
    return this.httpClient.post(
      "http://localhost:8080/api/products", product
    ) as Observable<IProduct>
  }

  public getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get(
      "http://localhost:8080/api/products"
    ) as Observable<IProduct[]>
  }

  public updateProduct(product: IProduct): Observable<IProduct>{
    return this.httpClient.put(
      "http://localhost:8080/api/products", product
    ) as Observable<IProduct>
  }

  public deleteProduct(productId: number): Observable<IProduct>{
    return this.httpClient.delete(
      `http://localhost:8080/api/products/${productId}`
    ) as Observable<IProduct>
  }

  //cart methods
  public createCart(cart: ICart): Observable<ICart>{
    return this.httpClient.post(
      "http://localhost:8080/api/carts", cart
    ) as Observable<ICart>
  }

  public getCart(accountId: number): Observable<ICart>{
    return this.httpClient.get(
      `http://localhost:8080/api/carts/${accountId}`) as Observable<ICart>
  }

  public updateCart(cart: ICart): Observable<ICart>{
    return this.httpClient.put(
      "http://localhost:8080/api/carts", cart
    ) as Observable<ICart>
  }

  public deleteCart(cartId: number): Observable<ICart>{
    return this.httpClient.delete(`http://localhost:8080/api/carts/${cartId}`
    ) as Observable<ICart>
  }

  //invoice methods
  public createInvoice(invoice: IInvoiceList): Observable<IInvoiceList>{
    return this.httpClient.post(
      "http://localhost:8080/api/invoices", invoice
    ) as Observable<IInvoiceList>
  }

  public getAllInvoices(): Observable<IInvoiceList[]> {
    return this.httpClient.get(
      "http://localhost:8080/api/invoices"
    ) as Observable<IInvoiceList[]>
  }

  public getInvoicesById(accountId: number): Observable<IInvoiceList[]>{
    return this.httpClient.get(
      `http://localhost:8080/api/invoices/${accountId}`) as Observable<IInvoiceList[]>

    //
  }
















}//end of class

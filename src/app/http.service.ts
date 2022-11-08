import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "./___interfaces/IProduct";
import {Observable} from "rxjs";
import {ICart} from "./___interfaces/ICart";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {

  }

// Product methods
  public createProduct(product: IProduct): Observable<IProduct>{
    return this.httpClient.post(
      "http://localhost:8080/api/product", product
    ) as Observable<IProduct>
  }

  public getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get(
      "http://localhost:8080/api/product"
    ) as Observable<IProduct[]>
  }

  public updateProduct(product: IProduct): Observable<IProduct>{
    return this.httpClient.put(
      "http://localhost:8080/api/product",product
    ) as Observable<IProduct>
  }

  public deleteProduct(productId: number): Observable<IProduct>{
    return this.httpClient.delete(
      `http://localhost:8080/api/product/${productId}`
    ) as Observable<IProduct>
  }

  //cart methods
  public createCart(): Observable<ICart>{
    return this.httpClient.post(
      "http://localhost:8080/api/cart", {}
    ) as Observable<ICart>
  }

  public getCart(accountId: number): Observable<ICart>{
    return this.httpClient.get(
      `http://localhost:8080/api/cart/${accountId}`) as Observable<ICart>
  }

  public updateCart(cart: ICart): Observable<ICart>{
    return this.httpClient.put(
      "http://localhost:8080/api/cart", cart
    ) as Observable<ICart>
  }

  public deleteCart(cartId: number): Observable<ICart>{
    return this.httpClient.delete(`http://localhost:8080/api/cart/${cartId}`
    ) as Observable<ICart>
  }












}//end of class

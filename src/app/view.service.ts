import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  public $viewLogin = new BehaviorSubject<boolean>(false);
  public $viewRegister = new BehaviorSubject<boolean>(false);
  public $viewCart = new BehaviorSubject<boolean>(false);
  public $viewInvoices = new BehaviorSubject<boolean>(false);
  public $viewProfile = new BehaviorSubject<boolean>(false);

  constructor() { }

  public viewClose() {
    this.$viewLogin.next(false);
    this.$viewRegister.next(false);
  }
  public viewLogin() {
    this.$viewLogin.next(true);
    this.$viewRegister.next(false);
  }

  public viewRegister() {
    this.$viewRegister.next(true);
    this.$viewLogin.next(false);
  }

  public viewCart() {
    this.$viewCart.next(true);
  }

  public viewCloseCart() {
    this.$viewCart.next(false);
  }

  public viewInvoices() {
    this.$viewInvoices.next(true);
  }

  public viewProfile() {
    this.$viewProfile.next(true);
  }



}

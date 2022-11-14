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
  public $viewCategories = new BehaviorSubject<boolean>(false);
  public $viewInventory = new BehaviorSubject<boolean>(false);
  public $viewCoupons = new BehaviorSubject<boolean>(false);
  public $viewManageProfiles = new BehaviorSubject<boolean>(false);
  public $viewFilterSidebar = new BehaviorSubject<boolean>(false);
  public $viewCreateAccount = new BehaviorSubject<boolean>(false);
  public $viewEditAccount = new BehaviorSubject<boolean>(false);
  public $viewProductList = new BehaviorSubject<boolean>(true);

  constructor() { }

  public viewCloseAll() {
    this.$viewLogin.next(false);
    this.$viewRegister.next(false);
    this.$viewCart.next(false);
    this.$viewInvoices.next(false);
    this.$viewProfile.next(false);
    this.$viewCategories.next(false);
    this.$viewInventory.next(false);
    this.$viewCoupons.next(false);
    this.$viewManageProfiles.next(false);
    this.$viewFilterSidebar.next(false);
    this.$viewCreateAccount.next(false);
    this.$viewEditAccount.next(false);
    this.$viewProductList.next(false);
  }

  // Open views
  public viewLogin() {
    this.viewCloseAll();
    this.$viewLogin.next(true);
  }

  public viewRegister() {
    this.viewCloseAll();
    this.$viewRegister.next(true);
  }

  public viewCart() {
    this.viewCloseAll();
    this.$viewCart.next(true);
  }

  public viewInvoices() {
    this.viewCloseAll();
    this.$viewInvoices.next(true);
  }

  public viewProfile() {
    this.viewCloseAll();
    this.$viewProfile.next(true);
  }

  public viewCategories() {
    this.viewCloseAll();
    this.$viewCategories.next(true);
  }

  public viewInventory() {
    this.viewCloseAll();
    this.$viewInventory.next(true);
  }

  public viewCoupons() {
    this.viewCloseAll();
    this.$viewCoupons.next(true);
  }

  public viewManageProfiles() {
    this.viewCloseAll();
    this.$viewManageProfiles.next(true);
  }

  public viewFilterSidebar() {
    this.viewCloseAll();
    this.$viewFilterSidebar.next(true);
  }

  public viewProductList() {
    this.viewCloseAll();
    this.$viewProductList.next(true);
  }

  public viewCreateAccount() {
    this.$viewCreateAccount.next(true);
  }

  public viewEditAccount() {
    this.$viewEditAccount.next(true);
  }

  // Close views
  public viewCloseLogin() {
    this.$viewLogin.next(false);
  }

  public viewCloseRegister() {
    this.$viewRegister.next(false);
  }

  public viewCloseCart() {
    this.$viewCart.next(false);
  }

  public viewCloseInvoices() {
    this.$viewInvoices.next(false);
  }

  public viewCloseProfile() {
    this.$viewProfile.next(false);
  }

  public viewCloseCategories() {
    this.$viewCategories.next(false);
  }

  public viewCloseInventory() {
    this.$viewInventory.next(false);
  }

  public viewCloseCoupons() {
    this.$viewCoupons.next(false);
  }

  public viewCloseManageProfiles() {
    this.$viewManageProfiles.next(false);
  }

  public viewCloseFilterSidebar() {
    this.$viewFilterSidebar.next(false);
  }

  public viewCloseCreateAccount() {
    this.$viewCreateAccount.next(false);
  }

  public viewCloseEditAccount() {
    this.$viewEditAccount.next(false);
  }

  public viewCloseProductList() {
    this.$viewProductList.next(false);
  }

}

import {Component, OnDestroy} from '@angular/core';
import {CartService} from "../cart.service";
import {AccountService} from "../account.service";
import {IAccount} from "../___interfaces/IAccount";
import {ViewService} from "../view.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{

  public account: IAccount | null = null;
  accountType: String = "";
  numberOfProductsInCart: number = 0;
  onDestroy$ = new Subject()

  constructor(private cartService: CartService, private accountService: AccountService, private viewService: ViewService) {
    this.accountService.$account.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (account) => {
        this.account = account
       this.renderAccountType();
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.cartService.$cart.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (cart) => {
        this.numberOfProductsInCart = 0;
        for (let productList of cart.productList)
          this.numberOfProductsInCart += productList.count;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  onViewLogin() {
    this.viewService.viewLogin();
  }

  onViewRegister() {
    this.viewService.viewRegister();
  }

  onViewCart() {
    this.viewService.viewCart();
  }

  onLogout() {
    this.accountService.logout();
  }

  onViewProfile() {
    this.viewService.viewProfile();
  }

  onViewInvoices() {
    this.viewService.viewInvoices();
  }

  onViewCategories() {
    this.viewService.viewCategories();
  }

  onViewInventory() {
    this.viewService.viewInventory();
  }

  onViewCoupons() {
    this.viewService.viewCoupons();
  }

  onViewManageProfiles() {
    this.viewService.viewManageProfiles();
  }

  onViewProductList() {
    this.viewService.viewProductList();
  }

  renderAccountType() {
    switch (this.account?.type) {
      case 1:
        this.accountType = "Customer"
        break;
      case 2:
        this.accountType = "Shopkeeper"
        break;
      case 3:
        this.accountType = "Admin"
        break;
      default:
        this.accountType = "Error"
        break;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

}

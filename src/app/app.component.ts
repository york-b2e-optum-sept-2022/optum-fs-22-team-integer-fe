import {Component} from '@angular/core';
import {CartService} from "./cart.service";
import {AccountService} from "./account.service";
import {ViewService} from "./view.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'optum-fs-22-team-integer-fe';
  isLoggedIn: boolean = false;
  type!: number;

  viewLogin: boolean = false;
  viewRegister: boolean = false;
  viewCart: boolean = false;
  viewInvoices: boolean = false;
  viewProfile: boolean = false;
  viewCategories: boolean = false;
  viewInventory: boolean = false;
  viewCoupons: boolean = false;
  viewManageProfiles: boolean = false;
  viewFilterSidebar: boolean = false;

  constructor(private accountService: AccountService, private cartService: CartService, private viewService: ViewService) {
    this.accountService.$account.subscribe({
      next: (account) => {
        if (account) {
          this.isLoggedIn = account !== null;
          this.type = account.type;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.viewService.$viewLogin.subscribe(
      (viewLogin) => this.viewLogin = viewLogin
    );
    this.viewService.$viewRegister.subscribe(
      (viewRegister) => this.viewRegister = viewRegister
    );
    this.viewService.$viewCart.subscribe(
      (viewCart) => this.viewCart = viewCart
    );
    this.viewService.$viewInvoices.subscribe(
      (viewInvoices) => this.viewInvoices = viewInvoices
    );
    this.viewService.$viewProfile.subscribe(
      (viewProfile) => this.viewProfile = viewProfile
    );
    this.viewService.$viewCategories.subscribe(
      (viewCategories) => this.viewCategories = viewCategories
    );
    this.viewService.$viewInventory.subscribe(
      (viewInventory) => this.viewInventory = viewInventory
    );
    this.viewService.$viewCoupons.subscribe(
      (viewCoupons) => this.viewCoupons = viewCoupons
    );
    this.viewService.$viewManageProfiles.subscribe(
      (viewManageProfiles) => this.viewManageProfiles = viewManageProfiles
    );
    this.viewService.$viewFilterSidebar.subscribe(
      (viewFilterSidebar) => this.viewFilterSidebar = viewFilterSidebar
    );

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

  onViewFilterSidebar() {
    this.viewService.viewFilterSidebar();
  }


}

import {Component} from '@angular/core';
import {CartService} from "../cart.service";
import {AccountService} from "../account.service";
import {IAccount} from "../___interfaces/IAccount";
import {ViewService} from "../view.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public account: IAccount | null = null;
  accountType: String = "";

  constructor(private cartService: CartService, private accountService: AccountService, private viewService: ViewService) {
    this.accountService.$account.subscribe({
      next: (account) => {
        this.account = account
       this.renderAccountType();
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

}

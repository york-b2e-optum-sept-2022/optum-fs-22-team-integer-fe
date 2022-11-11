import { Component } from '@angular/core';
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

  constructor(private cartService: CartService, private accountService: AccountService, private viewService: ViewService) {
    this.accountService.$account.subscribe({
      next: (account) => {
          this.account = account

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

}

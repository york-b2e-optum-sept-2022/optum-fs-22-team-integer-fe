import { Component } from '@angular/core';
import {CartService} from "./cart.service";
import {AccountService} from "./account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'optum-fs-22-team-integer-fe';
  viewCart: boolean = false;
  viewInvoices: boolean = false;
  viewLogin: boolean = false;
  viewRegister: boolean = false;
  isLoggedIn: boolean = false;
  accountType: number = 1;

  constructor(private accountService: AccountService, private cartService: CartService) {
    this.accountService.$account.subscribe({
      next: (account) => {
        if(account) {
          this.isLoggedIn = account !== null;
          this.accountType = account.accountType;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.accountService.$viewLogin.subscribe(
      (viewLogin) => {
        this.viewLogin = viewLogin;
      }
    );

    this.accountService.$viewRegister.subscribe(
      (viewRegister) => {
        this.viewRegister = viewRegister;
      }
    );

    this.cartService.$viewCart.subscribe(
      (viewCart) => {
        this.viewCart = viewCart;
      }
    );

    this.cartService.$viewInvoices.subscribe(
      viewInvoices => this.viewInvoices = viewInvoices
    );

  }


}

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
  viewLogin: boolean = false;
  viewRegister: boolean = false;

  constructor(private accountService: AccountService, private cartService: CartService) {
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

  }


}

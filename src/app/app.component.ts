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
  viewLogin: boolean = false;
  viewRegister: boolean = false;
  viewCart: boolean = false;
  viewInvoices: boolean = false;
  viewProfile: boolean = false;
  isLoggedIn: boolean = false;
  type!: number;

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
      (viewLogin) => {
        this.viewLogin = viewLogin;
      }
    );

    this.viewService.$viewRegister.subscribe(
      (viewRegister) => {
        this.viewRegister = viewRegister;
      }
    );

    this.viewService.$viewCart.subscribe(
      (viewCart) => {
        this.viewCart = viewCart;
      }
    );

    this.viewService.$viewInvoices.subscribe(
      viewInvoices => this.viewInvoices = viewInvoices
    );

    this.viewService.$viewProfile.subscribe(
      viewProfile => this.viewProfile = viewProfile
    );

  }

  onViewInvoices() {
    this.viewService.viewInvoices();
  }

  onViewProfile() {
    this.viewService.viewProfile();
  }


}

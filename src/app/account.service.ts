import { Injectable } from '@angular/core';
import {IAccount} from "./___interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";
import {CartService} from "./cart.service";
import {ViewService} from "./view.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $account = new BehaviorSubject<IAccount | null>(null);

  $loginError = new BehaviorSubject<string>("");
  $registrationError = new BehaviorSubject<string>("");

  private USERNAME_TAKEN_ERROR = "Username is already in use"
  private UNKNOWN_ERROR = "Unknown error, please try again"
  private LOGIN_ERROR = "Invalid login, please try again"

  constructor(private httpService: HttpService, private cartService: CartService, private viewService: ViewService) {
  }

  public login(email: string, password: string) {
    this.httpService.login(email, password).pipe(first()).subscribe({
      next: (account) => {
        this.$account.next(account);
        this.cartService.connectCart(account.id)
        this.viewService.viewClose();
      },
      error: (err) => {
        this.$loginError.next(this.LOGIN_ERROR);
      }
    })
  }

  public logout() {
    this.$account.next(null);
    console.log(this.$account.getValue());
  }

  public createAccount(email: string, password: string) {
    let account = {
      email: email,
      password: password,
      type: 1
    }

    this.httpService.createAccount(account)
      .pipe(first())
      .subscribe({
        next: (account) => {
          this.$account.next(account);
          this.cartService.connectCart(account.id)
          this.viewService.viewClose();
        },
        error: (err) => {
          if (err.status === 409) {
            this.$registrationError.next(this.USERNAME_TAKEN_ERROR);
            return;
          }

          this.$registrationError.next(this.UNKNOWN_ERROR);
        }
      })
  }

}

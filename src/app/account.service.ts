import { Injectable } from '@angular/core';
import {IAccount} from "./___interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";
import {CartService} from "./cart.service";
import {ViewService} from "./view.service";
import {IAccountUpdate} from "./___interfaces/IAccountUpdate";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $account = new BehaviorSubject<IAccount | null>(null);
  $accountList = new BehaviorSubject<IAccount[] | null>(null);

  $loginError = new BehaviorSubject<string>("");
  $registrationError = new BehaviorSubject<string>("");
  $accountError = new BehaviorSubject<string>("");

  private USERNAME_TAKEN_ERROR = "Username is already in use"
  private UNKNOWN_ERROR = "Unknown error, please try again"
  private LOGIN_ERROR = "Invalid login, please try again"
  private OWN_ACCOUNT_DELETE_ERROR = "You can not delete your own account"
  private OWN_ACCOUNT_DEESCALATE_ERROR = "You can not deescalate your own account"

  constructor(private httpService: HttpService, private cartService: CartService, private viewService: ViewService) {
  }

  public login(email: string, password: string) {
    this.httpService.login(email, password).pipe(first()).subscribe({
      next: (account) => {
        this.$account.next(account);
        this.cartService.connectCart(account.id)
        this.viewService.viewCloseLogin();
        this.viewService.viewProductList();
      },
      error: () => {
        this.$loginError.next(this.LOGIN_ERROR);
      }
    })
  }

  public logout() {
    this.$account.next(null);
    this.cartService.$cart.next({
      accountId: 0,
      productList: [],
      totalPrice: 0
    });
    this.viewService.viewCloseAll();
    this.viewService.viewProductList();
  }

  public createAccount(email: string, password: string, type: number) {
    if(this.$account.getValue() === null) {
      let account = {
        email: email,
        password: password,
        type: type
      }
      this.httpService.createAccount(account)
        .pipe(first())
        .subscribe({
          next: (account) => {
            this.$account.next(account);
            this.cartService.connectCart(account.id)
            this.viewService.viewCloseRegister();
          },
          error: (err) => {
            if (err.status === 409) {
              this.$registrationError.next(this.USERNAME_TAKEN_ERROR);
              return;
            }
            this.$registrationError.next(this.UNKNOWN_ERROR);
          }
        })
    } else if (this.$account.getValue()?.type === 3) {
      let account = {
        email: email,
        password: password,
        type: type
      }
      this.httpService.createAccount(account)
        .pipe(first())
        .subscribe({
          next: (account) => {
            this.cartService.connectCart(account.id)
            this.viewService.viewCloseCreateAccount();
            this.getAllAccounts();
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

  public updateAccount(account: IAccountUpdate) {
    if (this.$account.getValue()?.id === account.id && this.$account.getValue()?.type === 3) {
      this.$accountError.next(this.OWN_ACCOUNT_DEESCALATE_ERROR);
      return;
    }
    this.httpService.updateAccount(account).pipe(first()).subscribe({
      next: () => {
        this.viewService.viewCloseProfile();
        this.viewService.viewCloseEditAccount();
        this.getAllAccounts();
      },
      error: () => {}
    });

  }

  public deleteAccount(id: number) {
    if (this.$account.getValue()?.id === id && this.$account.getValue()?.type === 3) {
      this.$accountError.next(this.OWN_ACCOUNT_DELETE_ERROR);
      return;
    }
    this.httpService.deleteAccount(id).pipe(first()).subscribe({
      next: () => {
        this.httpService.deleteCart(id).pipe(first()).subscribe({
          next: () => {
            this.viewService.viewCloseEditAccount();
            this.getAllAccounts();
          },
          error: () => {}
        })
      },
      error: () => {}
    });
    if (this.$account.getValue()?.type !== 3) {
      this.$account.next(null);
    }
  }

  public getAllAccounts() {
    this.httpService.getAllAccounts().pipe(first()).subscribe({
      next: (accountList) => {
        accountList.sort((a, b) => a.id - b.id);
        this.$accountList.next(accountList);
      },
      error: () => {}
    });
  }

}

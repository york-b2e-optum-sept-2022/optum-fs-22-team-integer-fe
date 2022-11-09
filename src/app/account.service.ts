import { Injectable } from '@angular/core';
import {IAccount} from "./___interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $account = new BehaviorSubject<IAccount | null>(null);
  public $viewLogin = new BehaviorSubject<boolean>(false);
  public $viewRegister = new BehaviorSubject<boolean>(false);

  $loginError = new BehaviorSubject<string>("");
  $registrationError = new BehaviorSubject<string>("");

  private USERNAME_TAKEN_ERROR = "Username is already in use"
  private UNKNOWN_ERROR = "Unknown error, please try again"
  private LOGIN_ERROR = "Invalid login, please try again"

  constructor(private httpService: HttpService) {
  }

  public login(username: string, password: string) {
    this.httpService.login(username,password).pipe(first()).subscribe({
      next: (account) => {
        this.$account.next(account);
      },
      error: (err) => {
        this.$loginError.next(this.LOGIN_ERROR);
      }
    })
  }

  public createAccount(username: string, password: string) {
    const accountType: number = 1;
    this.httpService.createAccount(username, password, accountType)
      .pipe(first())
      .subscribe({
        next: (account) => {
          this.$account.next(account);
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

  public viewLogin() {
    this.$viewLogin.next(true);
    this.$viewRegister.next(false);
  }

  public viewRegister() {
    this.$viewRegister.next(true);
    this.$viewLogin.next(false);
  }

  public viewClose() {
    this.$viewLogin.next(false);
    this.$viewRegister.next(false);
  }
}

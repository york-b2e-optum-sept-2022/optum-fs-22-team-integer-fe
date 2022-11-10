import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  email: string = "";
  password: string = "";
  errorMessage: string = "";

  subscription: Subscription;

  constructor(private accountService: AccountService) {
    this.subscription = this.accountService.$loginError.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin() {
    this.accountService.login(this.email, this.password);
  }

  onCreateAccount() {
    this.accountService.viewRegister();
  }

  onClose() {
    this.accountService.viewClose();
  }

}

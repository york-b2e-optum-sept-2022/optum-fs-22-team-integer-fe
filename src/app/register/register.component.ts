import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  subscription: Subscription;

  constructor(private accountService: AccountService) {
    this.subscription = this.accountService.$registrationError.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRegister() {
    this.accountService.createAccount(
      this.username,
      this.password
    );
  }

  onAccountExists() {
    this.accountService.viewLogin();
  }

  onClose() {
    this.accountService.viewClose();
  }

}

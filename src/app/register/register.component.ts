import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";
import {ViewService} from "../view.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  email: string = "";
  password: string = "";
  errorMessage: string = "";

  subscription: Subscription;

  constructor(private accountService: AccountService, private viewService: ViewService) {
    this.subscription = this.accountService.$registrationError.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRegister() {
    this.accountService.createAccount(
      this.email,
      this.password
    );
  }

  onAccountExists() {
    this.viewService.viewLogin();
  }

  onClose() {
    this.viewService.viewCloseRegister();
  }

}

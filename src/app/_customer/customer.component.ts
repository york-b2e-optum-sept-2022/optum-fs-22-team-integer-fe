import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";
import {IAccount} from "../___interfaces/IAccount";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnDestroy{

  account!: IAccount;

  subscription: Subscription;

  constructor(private accountService: AccountService) {
    this.subscription = this.accountService.$account.subscribe({
      next: (account) => {
        if(account) {
          this.account = account;
        }
      },
      error: (err) => {
        // TODO add error handling
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

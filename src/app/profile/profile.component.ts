import {Component, OnDestroy} from '@angular/core';
import {ViewService} from "../view.service";
import {AccountService} from "../account.service";
import {Subscription} from "rxjs";
import {IAccount} from "../___interfaces/IAccount";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {

  account!: IAccount;
  password: string = "";

  subscription: Subscription;

  constructor(private accountService: AccountService, private viewService: ViewService) {
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

  onClose() {
    this.viewService.viewCloseProfile();
  }

  onDelete() {
    this.accountService.deleteAccount(this.account.id);
  }

  onUpdate() {
    let account = {
      id: this.account.id,
      password: this.password,
      type: this.account.type
    }

    this.accountService.updateAccount(account);
  }

}

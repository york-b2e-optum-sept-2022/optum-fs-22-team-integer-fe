import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewService} from "../view.service";
import {IAccount} from "../___interfaces/IAccount";
import {AccountService} from "../account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.css']
})
export class ManageProfilesComponent implements OnInit, OnDestroy {

  accountList!: IAccount[]
  selectedAccount!: IAccount | null
  errorMessage: string = "";

  subscription: Subscription;
  subscription2: Subscription;

  constructor(private accountService: AccountService, private viewService: ViewService) {
    this.subscription = this.accountService.$accountList.subscribe({
        next: (accountList) => {
          if (accountList) {
            this.accountList = accountList
          }
        },
        error: () => {}
    });

    this.subscription2 = this.accountService.$accountError.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnInit(): void {
    this.accountService.getAllAccounts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onClose() {
    this.viewService.viewCloseManageProfiles();
  }

  onSelectAccountClick(accountId: string) {
    this.resetAccountError();
    for (let account of this.accountList) {
      if (account.id === parseInt(accountId))
        this.selectedAccount = account
    }
  }

  onDeleteClick() {
    this.resetAccountError();
    if(this.selectedAccount) {
      this.accountService.deleteAccount(this.selectedAccount.id);
    }
  }

  onSaveClick() {
    this.resetAccountError();
    if (this.selectedAccount) {
      let account = {
        id: this.selectedAccount.id,
        password: this.selectedAccount.password,
        type: this.selectedAccount.type
      }
      this.accountService.updateAccount(account);
    }
  }

  resetAccountError() {
    this.accountService.$accountError.next("");
  }

}

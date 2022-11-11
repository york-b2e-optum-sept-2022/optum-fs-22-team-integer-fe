import {Component, OnInit} from '@angular/core';
import {ViewService} from "../view.service";
import {IAccount} from "../___interfaces/IAccount";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.css']
})
export class ManageProfilesComponent implements OnInit {

  accountList!: IAccount[]
  selectedAccount!: IAccount | null

  constructor(private accountService: AccountService, private viewService: ViewService) {
    this.accountService.$accountList.subscribe({
        next: (accountList) => {
          if (accountList) {
            this.accountList = accountList
          }
        },
        error: () => {
        }
      }
    )
  }

  ngOnInit(): void {
    this.accountService.getAllAccounts();
  }

  onClose() {
    this.viewService.viewCloseManageProfiles();
  }

  onSelectAccountClick(accountId: string) {
    for(let account of this.accountList){
      if(account.id === parseInt(accountId))
        this.selectedAccount = account
    }
  }

}

import {Component, OnDestroy} from '@angular/core';
import {CartService} from "../cart.service";
import {IInvoiceList} from "../___interfaces/IInvoiceList";
import {AccountService} from "../account.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnDestroy{

  invoiceList!: IInvoiceList[]
  onDestroy$ = new Subject()

  constructor(private cartService: CartService, private accountService: AccountService) {
    if(this.accountService.$account.getValue()?.type === 1)
      this.cartService.getInvoiceByCartId()
    if (this.accountService.$account.getValue()?.type === 2 || this.accountService.$account.getValue()?.type === 3)
      this.cartService.getAllInvoices()

    this.cartService.$invoiceList.pipe(takeUntil(this.onDestroy$)).subscribe(
      invoiceList => this.invoiceList = invoiceList
    )
  }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

}

import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {IInvoiceList} from "../___interfaces/IInvoiceList";
import {AccountService} from "../account.service";
import {ViewService} from "../view.service";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceList!: IInvoiceList[]

  constructor(private cartService: CartService, private accountService: AccountService, private viewService: ViewService) {
    if (this.cartService.$cart.getValue().accountId === 0 || !this.accountService.$account.getValue())
      return
    if(this.accountService.$account.getValue()?.type === 1)
      this.cartService.getInvoiceByCartId()
    if (this.accountService.$account.getValue()?.type === 2 || this.accountService.$account.getValue()?.type === 3)
      this.cartService.getAllInvoices()

    this.cartService.$invoiceList.subscribe(
      invoiceList => this.invoiceList = invoiceList
    )
  }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseInvoices();
  }

}

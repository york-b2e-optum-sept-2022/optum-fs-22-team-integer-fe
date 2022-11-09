import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {IInvoiceList} from "../___interfaces/IInvoiceList";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceList!: IInvoiceList[]

  constructor(private cartService: CartService) {
    this.cartService.$invoiceList.subscribe(
      invoiceList => this.invoiceList = invoiceList
    )
  }

  ngOnInit(): void {
  }

}

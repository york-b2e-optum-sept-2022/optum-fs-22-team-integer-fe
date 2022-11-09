import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cartService: CartService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onViewLogin() {
    this.accountService.viewLogin();
  }

  onViewRegister() {
    this.accountService.viewRegister();
  }

  onCart() {
    this.cartService.viewCart();
  }

}

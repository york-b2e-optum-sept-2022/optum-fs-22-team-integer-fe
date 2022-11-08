import { Component } from '@angular/core';
import {CartService} from "./cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'optum-fs-22-team-integer-fe';
  viewCart: boolean = false;

  constructor(private cartService: CartService) {
    this.cartService.$viewCart.subscribe(
      (viewCart) => {
        this.viewCart = viewCart;
      }
    );

  }


}

import {Component, Input} from '@angular/core';
import {IProduct} from "../___interfaces/IProduct";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product!: IProduct;
  viewCartUI: boolean = false

  constructor(private cartService: CartService) {
    this.cartService.$viewCartUI.subscribe(
      viewCartUI => this.viewCartUI = viewCartUI
    )
  }

  onClickAddProduct(){
    this.cartService.addProduct(this.product);
  }

}

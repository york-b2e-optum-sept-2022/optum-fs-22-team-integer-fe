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

  constructor(private cartService: CartService) {

  }

  onClickAddProduct(){
    this.cartService.addProduct(this.product);
  }

}

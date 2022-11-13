import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../___interfaces/IProduct";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  @Input() product!: IProduct;
  viewCartUI: boolean = false
  isDiscontinued: boolean = false;

  constructor(private cartService: CartService) {
    this.cartService.$viewCartUI.subscribe(
      viewCartUI => this.viewCartUI = viewCartUI
    )
  }

  ngOnInit() {
    this.isDiscontinued = this.product.isDiscontinued;
    console.log(this.product);
  }

  onClickAddProduct(){
    this.cartService.addProduct(this.product);
    console.log(this.isDiscontinued);
    console.log(this.product);
  }

}

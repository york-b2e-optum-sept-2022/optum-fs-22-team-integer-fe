import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../___interfaces/IProduct";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: IProduct;
  isOnSale: boolean = false;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.getIsOnSale()
  }

  onClickAddProduct(){
    this.cartService.addProduct(this.product);
  }

  getIsOnSale(){
    this.isOnSale = false;
    if (this.product.salePercentOff &&
      new Date(this.product.saleStartDate).getDate() <= new Date().getDate() &&
      new Date(this.product.saleEndDate).getDate() >= new Date().getDate()) {
      this.isOnSale = true;
    }
  }



}

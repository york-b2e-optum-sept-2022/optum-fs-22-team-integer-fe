import { Component } from '@angular/core';
import {IProduct} from "../___interfaces/IProduct";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  public productList: IProduct[] = [];

  constructor(private productService: ProductService) {
    this.productService.$productList.subscribe(
      productList => {
        this.productList = productList
      }
    );
  }

}

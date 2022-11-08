import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../___interfaces/IProduct";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: IProduct;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    // this.productService.getProductList();
  }


}

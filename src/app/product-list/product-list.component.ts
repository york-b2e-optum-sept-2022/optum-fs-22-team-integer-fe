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
    this.productService.$displayList.subscribe(
      productList => {
        let availableProducts: IProduct[] = []
        let now: Date = new Date()
        for(let product of productList){
          if(new Date(product.dateAvailableOn).getDate() <= now.getDate() || !product.dateAvailableOn)
            if(product.storeQuantity !== 0) {
              availableProducts.push(product)
            }
        }
        this.productList = availableProducts
      }
    );
  }

}

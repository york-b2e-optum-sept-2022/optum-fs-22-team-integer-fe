import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";
import {ProductService} from "../product.service";
import {IProduct} from "../___interfaces/IProduct";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  productList!: IProduct[]
  selectedProduct!: IProduct | null

  constructor(private viewService: ViewService, private productService: ProductService) {
    this.productService.$productList.subscribe(
      list => this.productList = list
    )
  }

  ngOnInit(): void {
  }


  onClose() {
    this.viewService.viewCloseInventory();
  }

  onSelectProductClick(productId: string) {
    for(let product of this.productList){
      if(product.id === parseInt(productId))
        this.selectedProduct = product
    }
  }
}

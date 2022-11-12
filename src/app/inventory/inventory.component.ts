import {Component, OnInit} from '@angular/core';
import {ViewService} from "../view.service";
import {ProductService} from "../product.service";
import {IProduct} from "../___interfaces/IProduct";
import {ICategoryList} from "../___interfaces/ICategoryList";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  productList!: IProduct[]
  selectedProduct!: IProduct
  categoryList!: ICategoryList[]
  tagSelected: string | null = null
  originalProduct!: IProduct
  newProduct!: IProduct
  isCreating: boolean = false

  constructor(private viewService: ViewService, private productService: ProductService) {
    this.productService.$productList.subscribe(
      list => this.productList = list
    )
    this.productService.$categoryList.subscribe(
      list => this.categoryList = list
    )
  }

  ngOnInit(): void {
  }


  onClose() {
    this.viewService.viewCloseInventory();
  }

  onSelectProductClick(productId: string) {
    for (let product of this.productList) {
      if (product.id === parseInt(productId)) {
        this.originalProduct = product
        this.selectedProduct = {...product}
      }
    }
  }

  onSaveClick() {
    this.productService.updateProduct(this.selectedProduct)
  }

  onCancelClick() {
    if (this.selectedProduct !== undefined)
      this.selectedProduct = {...this.originalProduct}
  }

  onAddCategoryTag(tag: string) {
    this.selectedProduct?.categoryList.push(tag)
  }

  onCategoryTagClick(tag: string) {
    this.tagSelected = tag
  }

  onDeleteTagClick() {
    if(!this.tagSelected)
      return
    this.selectedProduct.categoryList.splice(this.selectedProduct.categoryList.indexOf(this.tagSelected, 1))
  }

  onCancelTagRemovalClick() {
    this.tagSelected = null
  }

  onAddNewProductClick() {
    this.isCreating = true
  }

  onCancelNewProductClick() {
    this.isCreating = false
  }

  onCreateProductClick() {
 this.productService.createProduct(
   {
     id: -1,
     isDiscontinued: false,
     msrp: 0,
     mapStartDate: new Date(),
     mapEndDate: new Date(),
     priceStartDate: new Date(),
     priceEndDate: new Date(),
     price: 0,
     saleStartDate: new Date(),
     saleEndDate: new Date(),
     salePercentOff: 0,
     quantityAtCost: 0,
     categoryList: [],
     storeQuantity: this.newProduct.storeQuantity,
     currentPrice: this.newProduct.currentPrice,
     description: this.newProduct.description,
     image: this.newProduct.image,
     dateAvailableOn: this.newProduct.dateAvailableOn
   }
 )
  }
}

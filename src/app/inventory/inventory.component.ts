import {Component} from '@angular/core';
import {ProductService} from "../product.service";
import {IProduct} from "../___interfaces/IProduct";
import {ICategoryList} from "../___interfaces/ICategoryList";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  productList!: IProduct[]
  selectedProduct!: IProduct | null
  categoryList!: ICategoryList[]
  tagSelected: string | null = null
  originalProduct!: IProduct
  newStoreQuantity!: number
  newCurrentPrice!: number
  newDescription!: string
  newImage!: string
  newDateAvailableOn!: Date
  isCreating: boolean = false

  constructor(private productService: ProductService) {
    this.productService.$productList.subscribe(
      list => this.productList = list
    )
    this.productService.$categoryList.subscribe(
      list => this.categoryList = list
    )
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
    if(this.selectedProduct)
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
    if(this.selectedProduct)
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
     storeQuantity: this.newStoreQuantity,
     currentPrice: this.newCurrentPrice,
     description: this.newDescription,
     image: this.newImage,
     dateAvailableOn: this.newDateAvailableOn
   }
 )
  }

  onDeleteProductClick() {
    if(this.selectedProduct)
    this.productService.deleteProduct(this.selectedProduct.id)
    this.selectedProduct = null
  }
}

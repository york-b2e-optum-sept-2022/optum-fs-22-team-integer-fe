import {Component, OnDestroy} from '@angular/core';
import {ProductService} from "../product.service";
import {IProduct} from "../___interfaces/IProduct";
import {ICategoryList} from "../___interfaces/ICategoryList";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnDestroy{

  productList!: IProduct[]
  selectedProduct!: IProduct | null
  categoryList!: ICategoryList[]
  tagSelected: string | null = null
  originalProduct!: IProduct
  newStoreQuantity!: number
  newCurrentPrice!: number
  newDescription!: string
  newImage!: string
  newMSRP!: number;
  newDateAvailableOn!: Date
  isCreating: boolean = false
  mapWarning: string | null = null
  onDestroy$ = new Subject();

  constructor(private productService: ProductService) {
    this.productService.$productList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => this.productList = list
    )
    this.productService.$categoryList.pipe(takeUntil(this.onDestroy$)).subscribe(
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
    // if (this.checkMapPrice()) {
    //   this.mapWarning = "CurrentPrice is below MAP"
    //   return
    // }
    if (this.selectedProduct)
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
    if (!this.tagSelected)
      return
    if (this.selectedProduct)
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
    // if (this.checkMapPrice()) {
    //   this.mapWarning = "CurrentPrice is below MAP"
    //   return
    // }
    this.productService.createProduct(
      {
        id: -1,
        isDiscontinued: false,
        msrp: this.newMSRP,
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
    if (this.selectedProduct)
      this.productService.deleteProduct(this.selectedProduct.id)
    this.selectedProduct = null
  }

  // private checkMapPrice() {
  //   if (this.selectedProduct.m &&
  //     new Date(this.selectedProduct?.mapStartDate ?).getDate() < new Date().getDate() &&
  //     new Date(this.selectedProduct.endDate).getDate() > new Date().getDate() &&) {
  //   }
  //
  //   return false;
  // }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }
}

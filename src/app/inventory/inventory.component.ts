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
export class InventoryComponent implements OnDestroy {

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
  onDestroy$ = new Subject();
  priceWarning: string | null = null
  private readonly profitMargin: number = 60

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
    let currentPrice = this.getCurrentPrice()
    if (this.checkPrice(currentPrice))
      return
    if (this.selectedProduct) {
      this.selectedProduct.currentPrice = currentPrice
      console.log(
        this.selectedProduct,
        this.priceWarning
      )
      this.productService.updateProduct(this.selectedProduct)
    }
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
    let currentPrice = this.getCurrentPrice()
    if (currentPrice)
      return
    this.checkPrice(currentPrice)
    if (this.checkPrice(currentPrice))
      return
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
        currentPrice: currentPrice,
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

  private checkPrice(currentPrice: number) {
    this.priceWarning = null
    if (!this.selectedProduct)
      return
    if (!this.selectedProduct.msrp)
      return
    if (currentPrice < this.selectedProduct.msrp * .80)
      this.priceWarning = "Price is lower than MAP"
    if (currentPrice < this.selectedProduct.msrp * (1 - (this.profitMargin/100)))
      this.priceWarning = "Price causes product to sell for a loss"
    return this.priceWarning
  }

  getCurrentPrice() {
    if (!this.selectedProduct)
      return 0
    if (this.newCurrentPrice)
      return this.newCurrentPrice
    if (this.selectedProduct.salePercentOff &&
      new Date(this.selectedProduct.saleStartDate).getDate() <= new Date().getDate() &&
      new Date(this.selectedProduct.saleEndDate).getDate() >= new Date().getDate())
      return this.selectedProduct.currentPrice * (1 - (this.selectedProduct.salePercentOff / 100))
    if (this.selectedProduct.price &&
      new Date(this.selectedProduct.priceStartDate).getDate() <= new Date().getDate() &&
      new Date(this.selectedProduct.priceEndDate).getDate() >= new Date().getDate())
      return this.selectedProduct.price
    if (this.selectedProduct.price)
      return this.selectedProduct.price
    if (this.selectedProduct.currentPrice)
      return this.selectedProduct.currentPrice
    else return 0
  }


  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }


}

import {Component, OnDestroy} from '@angular/core';
import {ICategoryList} from "../___interfaces/ICategoryList";
import {ProductService} from "../product.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnDestroy{

  categoryList!: ICategoryList[]
  selectedCategory!: ICategoryList | null
  categoryName: string ='';
  isAddingNewCategory: boolean = false;
  newCategoryName: string ='';
  onDestroy$ = new Subject()

  constructor(private productService: ProductService ) {
    this.productService.$categoryList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => this.categoryList = list
    )
  }

  onSelectCategoryClick(categoryId: string) {
    for(let category of this.categoryList){
      if(category.id === parseInt(categoryId))
        this.selectedCategory = category
    }
    if (this.selectedCategory)
    {
      this.categoryName = this.selectedCategory.name
    }
  }

  onCancel() {
    this.selectedCategory = null;
    this.categoryName = ''
  }

  onUpdate() {
    console.log("Update this Category in the DB", this.selectedCategory)
    if (this.selectedCategory) {
      this.selectedCategory.name = this.categoryName
      this.categoryName = ''

      //DB Category PUT (update)
      this.productService.updateCategoryName(this.selectedCategory)

      this.selectedCategory = null;
    }
  }

  onAddNewClick() {
    this.isAddingNewCategory = true
  }

  onCancelNew() {
    this.isAddingNewCategory = false
    this.newCategoryName = ''
  }

  onSubmitNew() {
    this.isAddingNewCategory = false
    const newCategoryToAdd: ICategoryList = {
      id: -1,
      name: this.newCategoryName
    }
    this.productService.createNewCategory(newCategoryToAdd)
    this.newCategoryName = ''
  }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }
}

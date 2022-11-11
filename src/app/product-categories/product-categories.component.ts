import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";

import {ICategoryList} from "../___interfaces/ICategoryList";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  categoryList!: ICategoryList[]
  selectedCategory!: ICategoryList | null
  categoryName: string ='';

  constructor(private viewService: ViewService, private productService: ProductService ) {
    this.productService.$categoryList.subscribe(
      list => this.categoryList = list
    )
  }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseCategories();
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
}

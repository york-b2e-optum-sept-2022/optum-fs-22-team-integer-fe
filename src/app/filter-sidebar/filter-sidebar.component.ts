import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {ICategoryList} from "../___interfaces/ICategoryList";

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit {

  selectedCategory!: string
  categoryList!: ICategoryList[]



  constructor(private productService: ProductService) {
    this.productService.$categoryList.subscribe(
      list => this.categoryList = list
    )
  }

  ngOnInit(): void {
  }

  onViewSelect(categorySelected: string) {
    console.log(categorySelected)
this.productService.filterCategoryView(categorySelected)
  }
}

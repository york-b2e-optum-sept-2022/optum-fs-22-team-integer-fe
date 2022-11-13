import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";
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



  constructor(private viewService: ViewService, private productService: ProductService) {
    this.productService.$categoryList.subscribe(
      list => this.categoryList = list
    )
  }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseFilterSidebar();
  }

  onViewSelect(categorySelected: string) {
    console.log(categorySelected)
this.productService.filterCategoryView(categorySelected)
  }
}

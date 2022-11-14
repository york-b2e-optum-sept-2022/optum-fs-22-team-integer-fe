import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ICategoryList} from "../___interfaces/ICategoryList";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnDestroy {

  selectedCategory!: string
  categoryList!: ICategoryList[]
  onDestroy$ = new Subject()



  constructor(private productService: ProductService) {
    this.productService.$categoryList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => this.categoryList = list
    )
  }

  onViewSelect(categorySelected: string) {
    console.log(categorySelected)
this.productService.filterCategoryView(categorySelected)
  }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }
}

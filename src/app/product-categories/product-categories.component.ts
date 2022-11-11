import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseCategories();
  }

}

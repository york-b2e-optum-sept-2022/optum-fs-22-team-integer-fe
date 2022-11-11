import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseFilterSidebar();
  }

}

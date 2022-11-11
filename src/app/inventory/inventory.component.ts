import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseInventory();
  }

}

import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseCoupons();
  }

}

import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";
import {ICouponCodes} from "../___interfaces/ICouponCodes";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  couponcodeList!: ICouponCodes[];
  selectedCouponcode!: ICouponCodes | null;

  isUpdatingNewCouponcode: boolean = false;
  couponcodeName: String ='';
  currentCcStartDate: String = '';
  currentCcEndDate: String = '';
  currentCcUseLimit: number = 0;
  currentCcSalePercent: number = 0;

  isAddingNewCouponcode: boolean = false;
  newCouponcodeName: string ='';
  newCcStartDate: String = '';
  newCcEndDate: String = '';
  newCcUseLimit: number = 0;
  newCcSalePercent: number = 0;


  constructor(private viewService: ViewService, private cartService: CartService) {
    this.cartService.$couponCodeList.subscribe(
      list => this.couponcodeList = list
    )
  }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseCoupons();
  }

  onSelectCouponcodeClick(couponcodeId: string) {
    for(let couponcode of this.couponcodeList){
      if(couponcode.id === parseInt(couponcodeId))
        this.selectedCouponcode = couponcode
    }

    if (this.selectedCouponcode)
    {
      this.couponcodeName = this.selectedCouponcode.name
      if (this.selectedCouponcode.startDate) {
        this.currentCcStartDate = this.selectedCouponcode.startDate.toString();
      } else {
        this.currentCcStartDate = ""
      }
      if (this.selectedCouponcode.endDate) {
        this.currentCcEndDate = this.selectedCouponcode.endDate.toString();
      } else {
        this.currentCcEndDate = ""
      }

      this.currentCcUseLimit= this.selectedCouponcode.useLimit;
      this.currentCcSalePercent= this.selectedCouponcode.salePercent;
      this.isUpdatingNewCouponcode = true;
    }
  }

  onAddNewClick() {
    this.isAddingNewCouponcode = true
  }

  onCancelNew() {
    //cancel adding new
    this.isAddingNewCouponcode = false
    this.newCouponcodeName = ''
  }

  onSubmitNew() {
    this.isAddingNewCouponcode = false
    const newCouponcodeToAdd: ICouponCodes = {
      id: -1,
      name: this.newCouponcodeName,
      startDate: new Date(this.newCcStartDate.toString().replace(/-/g, '\/')),
      endDate: new Date(this.newCcEndDate.toString().replace(/-/g, '\/')),
      useLimit: this.newCcUseLimit,
      salePercent: this.newCcSalePercent,
    }
    this.cartService.createNewCouponCode(newCouponcodeToAdd)
    this.newCouponcodeName = ''
  }

  onCancel() {
    //update canceled
    this.selectedCouponcode = null;
    this.isUpdatingNewCouponcode = false;
    this.couponcodeName = ''
    this.currentCcStartDate= "";
    this.currentCcEndDate= "";
    this.currentCcUseLimit= 0;
    this.currentCcSalePercent= 0;
  }

  onUpdate() {
    //update code
    if (this.selectedCouponcode) {
      this.selectedCouponcode.name = this.couponcodeName
      this.selectedCouponcode.startDate = new Date(this.currentCcStartDate.toString().replace(/-/g, '\/'))
      this.selectedCouponcode.endDate = new Date(this.currentCcEndDate.toString().replace(/-/g, '\/'))
      this.selectedCouponcode.useLimit = this.currentCcUseLimit
      this.selectedCouponcode.salePercent = this.currentCcSalePercent

      this.couponcodeName = ''
      this.currentCcStartDate= "";
      this.currentCcEndDate= "";
      this.currentCcUseLimit= 0;
      this.currentCcSalePercent= 0;

      //DB Category PUT (update)
      this.cartService.updateCouponCode(this.selectedCouponcode)

      this.selectedCouponcode = null;
      this.isUpdatingNewCouponcode = false;
    }
  }
}

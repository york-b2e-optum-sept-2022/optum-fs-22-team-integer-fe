import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICouponCodes} from "../___interfaces/ICouponCodes";
import {CartService} from "../cart.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnDestroy {

  couponCodeList!: ICouponCodes[];
  selectedCouponCode!: ICouponCodes | null;

  isUpdatingNewCouponCode: boolean = false;
  couponCodeName: String ='';
  currentCcStartDate: String = '';
  currentCcEndDate: String = '';
  currentCcUseLimit: number = 0;
  currentCcSalePercent: number = 0;

  isAddingNewCouponCode: boolean = false;
  newCouponCodeName: string ='';
  newCcStartDate: String = '';
  newCcEndDate: String = '';
  newCcUseLimit: number = 0;
  newCcSalePercent: number = 0;
  onDestroy$ = new Subject()


  constructor(private cartService: CartService) {
    this.cartService.$couponCodeList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => this.couponCodeList = list
    )
  }


  onSelectCouponCodeClick(couponCodeId: string) {
    for(let couponCode of this.couponCodeList){
      if(couponCode.id === parseInt(couponCodeId))
        this.selectedCouponCode = couponCode
    }

    if (this.selectedCouponCode)
    {
      this.couponCodeName = this.selectedCouponCode.name
      if (this.selectedCouponCode.startDate) {
        this.currentCcStartDate = this.selectedCouponCode.startDate.toString();
      } else {
        this.currentCcStartDate = ""
      }
      if (this.selectedCouponCode.endDate) {
        this.currentCcEndDate = this.selectedCouponCode.endDate.toString();
      } else {
        this.currentCcEndDate = ""
      }

      this.currentCcUseLimit= this.selectedCouponCode.useLimit;
      this.currentCcSalePercent= this.selectedCouponCode.salePercent;
      this.isUpdatingNewCouponCode = true;
    }
  }

  onAddNewClick() {
    this.isAddingNewCouponCode = true
  }

  onCancelNew() {
    //cancel adding new
    this.isAddingNewCouponCode = false
    this.newCouponCodeName = ''
  }

  onSubmitNew() {
    this.isAddingNewCouponCode = false
    const newCouponCodeToAdd: ICouponCodes = {
      id: -1,
      name: this.newCouponCodeName,
      startDate: new Date(this.newCcStartDate.toString().replace(/-/g, '\/')),
      endDate: new Date(this.newCcEndDate.toString().replace(/-/g, '\/')),
      useLimit: this.newCcUseLimit,
      salePercent: this.newCcSalePercent,
    }
    this.cartService.createNewCouponCode(newCouponCodeToAdd)
    this.newCouponCodeName = ''
  }

  onCancel() {
    //update canceled
    this.selectedCouponCode = null;
    this.isUpdatingNewCouponCode = false;
    this.couponCodeName = ''
    this.currentCcStartDate= "";
    this.currentCcEndDate= "";
    this.currentCcUseLimit= 0;
    this.currentCcSalePercent= 0;
  }

  onDelete() {
    if(this.selectedCouponCode) {
      this.cartService.deleteCouponCode(this.selectedCouponCode.id);
      this.selectedCouponCode = null;
      this.isUpdatingNewCouponCode = false;
    }
  }

  onUpdate() {
    //update code
    if (this.selectedCouponCode) {
      this.selectedCouponCode.name = this.couponCodeName
      this.selectedCouponCode.startDate = new Date(this.currentCcStartDate.toString().replace(/-/g, '\/'))
      this.selectedCouponCode.endDate = new Date(this.currentCcEndDate.toString().replace(/-/g, '\/'))
      this.selectedCouponCode.useLimit = this.currentCcUseLimit
      this.selectedCouponCode.salePercent = this.currentCcSalePercent

      this.couponCodeName = ''
      this.currentCcStartDate= "";
      this.currentCcEndDate= "";
      this.currentCcUseLimit= 0;
      this.currentCcSalePercent= 0;

      //DB Category PUT (update)
      this.cartService.updateCouponCode(this.selectedCouponCode)

      this.selectedCouponCode = null;
      this.isUpdatingNewCouponCode = false;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

}

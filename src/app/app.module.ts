import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './__navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { CustomerComponent } from './_customer/customer.component';
import { ShopkeeperComponent } from './_shopkeeper/shopkeeper.component';
import { AdminComponent } from './_admin/admin.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ManageProfilesComponent } from './manage-profiles/manage-profiles.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    NavbarComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    FilterSidebarComponent,
    CustomerComponent,
    ShopkeeperComponent,
    AdminComponent,
    InvoiceComponent,
    ProfileComponent,
    ProductCategoriesComponent,
    InventoryComponent,
    CouponsComponent,
    ManageProfilesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

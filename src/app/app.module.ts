import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProductListComponent} from "./products/product-list.component";
import {ProductFormComponent} from "./products/product-form/product-form.component";
import {ProductDetailComponent} from "./products/product-detail.component";
import {ProductEditingComponent} from "./products/product-editing.component";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterModule} from "@angular/router";
import {ProductDetailGuard} from "./products/product-detail.guard";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AngularMaterialModule} from "./shared/angular-material.module";
import {CartComponent} from "./cart/cart.component";
import {WelcomeComponent} from "./home/welcome.component";
import {LoginComponent} from "./login/login.component";
import {NewOrderComponent} from "./orders/new-order/new-order.component";
import {OrderComponent} from "./orders/order/order.component";
import {OrderLinesComponent} from "./orders/order-lines/order-lines.component";
import {OrdersComponent} from "./orders/orders.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterAdminComponent} from "./register-admin/register-admin.component";
import {StorageComponent} from "./storage/storage.component";
import {UsersComponent} from "./users/users.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ProductEditingComponent,
    CartComponent,
    WelcomeComponent,
    LoginComponent,
    NewOrderComponent,
    OrderComponent,
    OrderLinesComponent,
    OrdersComponent,
    ProfileComponent,
    RegisterComponent,
    RegisterAdminComponent,
    StorageComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxPaginationModule,
    HttpClientJsonpModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      // {path: 'login', component: LoginComponent},
      // {path: 'register', component: RegisterComponent},
      // {
      //   path: 'welcome', component: WelcomeComponent
      // },
      {path: 'add-product', component: ProductFormComponent,
        // canActivate: [UsersGuardGuard]
      },
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      // {
      //   path: 'cart', component: CartComponent
      // },
      // {
      //   path: 'orders', component: OrdersComponent
      // },
      // {
      //   path: 'order/:id',
      //   component: OrderComponent
      // },
      // {
      //   path: 'orders/new', component: NewOrderComponent
      // },
      // {
      //   path: 'storage', component: StorageComponent,
      //   canActivate: [UsersGuardGuard]
      // },
      // {
      //   path: 'users', component: UsersComponent,
      //   canActivate: [UsersGuardGuard]
      // },
      // {
      //   path: 'register-admins', component: RegisterAdminComponent,
      //   canActivate: [UsersGuardGuard]
      // },
      // {
      //   path:'profile/:id', component: ProfileComponent
      // },
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class AppModule { }

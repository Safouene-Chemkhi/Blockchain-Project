import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoryService } from './category.service';
import {FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProductFilterComponent } from './catalogue/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderService } from './order.service';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSucessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    RegisterComponent,
    SignupComponent,
    ProductFormComponent,
    CatalogueComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path : '', component : CatalogueComponent },
      { path : 'product-view/:id', component : ProductViewComponent},
      { path : 'login', component:LoginComponent},
      { path : 'signup', component:SignupComponent},
      { path : 'shopping-cart', component:ShoppingCartComponent},

      { path : 'check-out', component:CheckOutComponent, canActivate: [AuthGuard] },
      { path : 'products/new', component : ProductFormComponent, canActivate: [AuthGuard] },
      { path : 'products/:id', component : ProductFormComponent, canActivate: [AuthGuard]},
      { path : 'products', component : ProductsComponent, canActivate: [AuthGuard]},
      { path : 'order-success/:id', component:OrderSucessComponent, canActivate: [AuthGuard] },
      { path : 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path : 'admin/products', component:AdminProductsComponent, canActivate: [AuthGuard] },
      { path : 'admin/orders', component:AdminOrdersComponent, canActivate: [AuthGuard ] },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

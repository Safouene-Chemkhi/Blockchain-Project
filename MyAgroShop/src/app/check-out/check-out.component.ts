import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shoppingCart';
import { AngularFireObject } from '../../../node_modules/angularfire2/database';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { Subscription } from '../../../node_modules/rxjs';
import { OrderService } from '../order.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart$: AngularFireObject<ShoppingCart>;
  cart:ShoppingCart;
  shoppingCartItemCount:number;
  productIds:Product[];
  totalPrice:number;
  subscription : Subscription;
  constructor(private router :Router, private orderService :OrderService, private shoppingCartService : ShoppingCartService,private productService : ProductService) { }
  shipping : {    firstName?: string,
    lastName?: string,
    addressLine1?: number,
    addressLine2?: number,
    city?: string,
    email?: string} ={} 

  async placeOrder(){
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items
    };
    //console.log(order);
    let result = await this.orderService.storeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription=this.cart$.valueChanges().subscribe(cart  => {
      this.cart=cart;
      this.shoppingCartItemCount = 0 ;
      this.productIds=[];
      this.totalPrice=0;
      for( let productId in cart.items){
        this.productIds[this.shoppingCartItemCount] = cart.items[productId];
        this.totalPrice+= cart.items[productId].quantity * cart.items[productId].price;
        this.shoppingCartItemCount += 1 ;
      } 
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

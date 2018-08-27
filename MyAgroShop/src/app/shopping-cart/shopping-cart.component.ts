import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shoppingCart';
import { AngularFireObject } from '../../../node_modules/angularfire2/database';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: AngularFireObject<ShoppingCart>;
  cart:ShoppingCart;
  shoppingCartItemCount:number;
  productIds:Product[];
  totalPrice:number;
  subscription : Subscription;
  constructor(private shoppingCartService : ShoppingCartService,private productService : ProductService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription=this.cart$.valueChanges().subscribe(cart  => {
      this.cart=cart;
      this.shoppingCartItemCount = 0 ;
      this.productIds=[];
      this.totalPrice=0;
      for( let productId in cart.items){
        //this.ShoppingCartItemCount += cart.items[productId].quantity;
        this.productIds[this.shoppingCartItemCount] = cart.items[productId];
        this.totalPrice+= cart.items[productId].quantity * cart.items[productId].price;
        this.shoppingCartItemCount += 1 ;
      } 
    })
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

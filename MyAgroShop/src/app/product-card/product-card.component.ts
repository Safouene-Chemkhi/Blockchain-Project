import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { THROW_IF_NOT_FOUND } from '../../../node_modules/@angular/core/src/di/injector';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('show-actions') showActions = true ;
  @Input('shopping-cart') ShoppingCart;
  constructor(private cartService : ShoppingCartService, private router : Router) {}
    
  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.ShoppingCart) return 0 ;
    let item;
    if (this.ShoppingCart.items) item = this.ShoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  ViewProduct(key: string){
    this.router.navigate(['/product-view', key]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart';
import { Product } from '../models/product';
import { Subscription } from '../../../node_modules/rxjs';
import { AngularFireObject } from '../../../node_modules/angularfire2/database';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  cart$: AngularFireObject<ShoppingCart>;
  cart:ShoppingCart;
  requestsCount:number;
  productIds:Product[];
  totalPrice:number;
  subscription : Subscription;

  constructor(private requestService : RequestService) { }

  async ngOnInit() {
    this.cart$ = await this.requestService.getCart();
    this.subscription=this.cart$.valueChanges().subscribe(cart  => {
      console.log(cart);
      this.cart=cart;
      this.requestsCount = 0 ;
      this.productIds=[];
      this.totalPrice=0;
      for( let productId in cart){
        //this.requestsCount += cart[productId].quantity;
        this.productIds[this.requestsCount] = cart[productId];
        this.totalPrice+= cart[productId].quantity * cart[productId].price;
        this.requestsCount += 1 ;
      } 
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}

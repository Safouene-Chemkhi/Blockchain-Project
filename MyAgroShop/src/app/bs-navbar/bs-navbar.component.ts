import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser : AppUser;
  shoppingCartItemCount : number;
  constructor(public auth: AuthService, private shoppingCartService : ShoppingCartService) {
   }

  async ngOnInit(){
    this.auth.user$.subscribe(appUser => this.appUser = this.appUser );
   let cart$ =  await this.shoppingCartService.getCart()
   cart$.valueChanges().subscribe(cart => {
     this.shoppingCartItemCount = 0 ;
     for( let productId in cart.items){
       //this.ShoppingCartItemCount += cart.items[productId].quantity;
       this.shoppingCartItemCount += 1 ;
     } 
   })
  }
  async logout(){
    await this.auth.logout();
    localStorage.removeItem('uid');
  }

  trace(){
    alert('This feature is not complete yet.');
  }

}

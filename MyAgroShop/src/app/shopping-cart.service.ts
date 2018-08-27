import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../node_modules/angularfire2/database';
import { Product } from './models/product'; 
import { map ,take } from 'rxjs/operators'
import { ShoppingCart } from './models/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService  {
  item : { key?: string,
    title?: string,
    price?: number,
    quantity?: number,
    category?: string,
    imageUrl?: string,
    owner?: string};

  constructor(private db : AngularFireDatabase) { }
  shoppingCart: ShoppingCart;
 /*private async getOrCreateCartId(){
    let cart = sessionStorage.getItem('cart');
    sessionStorage
    this.shoppingCart.key = new Date().getTime().toString();
    if(cart) return cart;
    localStorage.setItem('cart', JSON.stringify( this.shoppingCart ));   // get item JSON.parse(localStorage.getItem('currentUser'));
    /*let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;*/
     
  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
  }


   async getCart(): Promise<AngularFireObject<ShoppingCart>>{
     let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);

  }

  private getItem(cartId: string , productId: string){
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + productId );

  }

  async addToCart(product :Product){
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product : Product){
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product : Product, change : number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      this.item = item ;
      let quantity=1;
      if(item) quantity = (this.item.quantity || 0) +change ;
      if (quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        category : product.category,
        imageUrl: product.imageUrl,
        price: product.price,
        owner: product.owner,
        quantity: quantity
      });} )
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId +'/items').remove();
  }
}

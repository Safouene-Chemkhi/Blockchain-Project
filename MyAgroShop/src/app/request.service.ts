import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../node_modules/angularfire2/database';
import { ShoppingCart } from './models/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  item : { key?: string,
    title?: string,
    price?: number,
    quantity?: number,
    category?: string,
    imageUrl?: string,
    owner?: string};
    shoppingCart: ShoppingCart;

  constructor(private db : AngularFireDatabase) { }

  async getCart(): Promise<AngularFireObject<ShoppingCart>>{
    let uid = await localStorage.getItem('uid');
    
   return this.db.object('users/'+uid+'/requests');

 }

 private getItem(uid: string , productId: string){
  console.log('users/'+uid+'/requests'  + productId );
   return this.db.object('users/'+uid+'/requests'  + productId );

 }

}

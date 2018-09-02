import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db : AngularFireDatabase) { }

  storeOrder(order){
    for( let p in order.items) {
      let x = this.db.list('users/'+order.items[p].owner+'/requests/').push(order.items[p]);
      this.db.object('users/'+order.items[p].owner+'/requests/'+ x.key).update(order.shipping);
      console.log('users/'+order.items[p].owner+'/requests/'+ p);
    };
    return this.db.list('/orders').push(order);
  }
}

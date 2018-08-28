import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from './models/product';
import { AppComponent } from './app.component';
import { Observable } from '../../node_modules/rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uid;
  constructor(private db : AngularFireDatabase ) {
    this.uid =  localStorage.getItem('uid');
   }

  create(product : Product ){
    product.owner=this.uid;
    let key = this.db.database.ref().push().key;
    this.db.object('/users/' + this.uid +'/uproducts/'+key).update(product);
    return this.db.object('/products/' + key).update(product);
    //console.log(key);
     //this.db.list('/users/' + this.uid +'/uproducts').push(product).key; /////problem
   // return this.db.list('/products').push(product).key;
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  getAll_u(){
    return this.db.list('/users/' + this.uid +'/uproducts').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  get(productId){
    return this.db.object('/users/' + this.uid +'/uproducts/' + productId).valueChanges();
  }

  getProd(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product:Product){
    product.owner=this.uid;
    this.db.object('/users/' + this.uid +'/uproducts/' +productId).update(product);
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    this.db.object('/users/' + this.uid +'/uproducts/' + productId).remove();
    this.db.object('/products/' + productId ).remove();
  }

  
}

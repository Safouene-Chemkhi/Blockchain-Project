import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }
  
  getCategories(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
 
  }
}

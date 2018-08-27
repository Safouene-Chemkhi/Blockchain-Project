import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AppUser } from './models/app-user';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user:AppUser) {
    this.db.object('/users/' + user.uid).update({
      name : user.uname,
      email : user.uemail,
      tel:user.utel
    })
    console.log('successfully logged');
  }

  get(uid :string){
    return this.db.object('/users/' + uid).valueChanges();
  }
  
}

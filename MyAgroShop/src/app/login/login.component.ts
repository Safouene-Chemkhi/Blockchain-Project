import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
;

  constructor(private auth : AuthService,  private db : AngularFireDatabase , private userService : UserService) {

   }


  async login(email ,password) {
    await this.auth.emailLogin(email.value,password.value);
    window.location.reload();
    this.auth.user$.subscribe(user => {
      if (!user) return; 
      localStorage.setItem('uid',user.uid) ;
      //console.log(user.uid);
    })
  }




}

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


  login(email ,password) {
    console.log(email);
    this.auth.emailLogin(email.value,password.value);
  }




}

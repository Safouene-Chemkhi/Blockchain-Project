import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  constructor( private auth : AuthService ) {
  }


  ngOnInit() {
  }

  emailSignUp(email, password,name,tel) {
    console.log(email);
    this.auth.emailSignUp(email.value,password.value,name.value,tel.value);
    //return this.afAuth.auth
   //   .createUserWithEmailAndPassword('safouene.cs3@gmail.com', '123456789')
  }
}

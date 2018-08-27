import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { switchMap} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth, private route :ActivatedRoute, private router : Router, private userService: UserService) {
    this.user$=afAuth.authState;
    
  }
 /* login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }*/

  emailSignUp(email, password,name,tel) {

    return this.afAuth.auth
      .createUserWithEmailAndPassword(email , password).then(() => {
        const user : AppUser = {
          uid:this.afAuth.auth.currentUser.uid,
          uemail: email ,
          uname: name ,
          utel :tel,
          uproduct : [] 
        };
        this.userService.save(user);
          this.router.navigate(['/']);
      }).catch(error => this.handleError(error));


  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['/']);
    }).catch(error => this.handleError(error));
  }


  logout(){
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });;
  }


  private handleError(error: Error) {
    console.error(error);
    alert(error.message);
  }

}


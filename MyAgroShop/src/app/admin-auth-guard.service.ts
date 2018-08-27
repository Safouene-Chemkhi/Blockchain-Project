import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { map, filter, scan ,switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService /*implements CanActivate*/ {

  //constructor(private auth : AuthService, private userService : UserService) { }
  //canActivate() :Observable<boolean>{
   // return this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid))
    //.map(appUser =>  appUser.isAdmin));
  //}
}

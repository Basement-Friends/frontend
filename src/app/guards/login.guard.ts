import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { LoginService } from '../services/login.service';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(
    private loginSrv: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      let user: User | null | undefined = this.loginSrv.loggedUser()
      if(user === undefined || user === null)
        return false
      return true
  }
  
}

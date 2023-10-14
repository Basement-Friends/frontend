import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { LoginService } from '../services/login.service';

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
    state: RouterStateSnapshot): Observable<boolean>{
      return this.loginSrv.loggedUser$.pipe(
        filter(currentUser => currentUser !== undefined),
        map(currentUser => {
          if(currentUser)
            return true 
          else {
            this.router.navigateByUrl("/login") 
            return false
          }
      }))
  }
  
}

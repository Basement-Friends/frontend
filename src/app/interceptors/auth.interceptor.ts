import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { filter } from 'rxjs';

export const BYPASS_AUTH = new HttpContextToken(() => false)

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(BYPASS_AUTH) === false){
    const authService: AuthService = inject(AuthService)
    authService.token$.pipe(
      filter(token => token !== undefined)
    )
    .subscribe(token => {
      const clonedReq = req.clone({ setHeaders: {
        Authorization: `Bearer ${token}`
      }})
      console.log(clonedReq)
      return next(clonedReq)
    })
  }
  return next(req);
};

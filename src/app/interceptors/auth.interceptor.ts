import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { filter } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService)
  const authUrl = "http://localhost:8080/api/auth"
  console.log(req.url)
  if(req.url !== authUrl){
    authService.token$.pipe(
      filter(token => token !== undefined)
    )
    .subscribe(token => {
      console.log(token)
      const clonedReq = req.clone({ setHeaders: {
        Authorization: `Bearer ${token}`
      }})
      return next(clonedReq)
    })
  }
  return next(req);
};

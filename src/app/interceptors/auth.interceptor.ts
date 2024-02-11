import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { LoginService } from '../services/login.service';

export const BYPASS_AUTH = new HttpContextToken(() => false)

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(BYPASS_AUTH) === false)
  {
    const loginSrv: LoginService = inject(LoginService)

    return loginSrv.token$.pipe(
      filter(token => token !== undefined),
      switchMap(token => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })

        return next(authReq)
      })
    )
  }
  return next(req);
}

import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { filter, switchMap } from 'rxjs';

export const BYPASS_AUTH = new HttpContextToken(() => false)

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(BYPASS_AUTH) === false)
  {
    const authService: AuthService = inject(AuthService)

    return authService.token$.pipe(
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

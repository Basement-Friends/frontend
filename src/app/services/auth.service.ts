import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  token$ = new BehaviorSubject<string | null | undefined>(undefined)

  logInSub: Subscription | null = null
  logOutSub: Subscription | null = null
  registerSub: Subscription | null = null

  constructor(
    private loginService: LoginService,
    private registerService: RegisterService
  ) { 
    this.logInSub = this.loginService.onLogIn.subscribe(token => this.setToken(token))
    this.logOutSub = this.loginService.onLogOut.subscribe(() => this.resetToken)
    this.registerSub = this.registerService.onRegister.subscribe(token => this.setToken(token))
  }
  
  ngOnDestroy(): void {
    if(this.logInSub)
      this.logInSub.unsubscribe()
    if(this.logOutSub)
        this.logOutSub.unsubscribe()
    if(this.registerSub)
      this.registerSub.unsubscribe() 
  }

  setToken(token: string) {
    this.token$.next(token)
  }

  resetToken(){
    this.token$.next(null)
  }
}

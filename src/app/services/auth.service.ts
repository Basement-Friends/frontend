import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token$ = new BehaviorSubject<string | null | undefined>(undefined)
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService
  ) { 
    this.loginService.onLogIn.subscribe(token => this.setToken(token))
    this.loginService.onLogOut.subscribe(() => this.resetToken)
    this.registerService.onRegister.subscribe(token => this.setToken(token))
  }

  setToken(token: string) {
    this.token$.next(token)
  }

  resetToken(){
    this.token$.next(null)
  }
}

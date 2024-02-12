import { HttpClient, HttpContext } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from '../classes/register-data';
import { BYPASS_AUTH } from '../interceptors/auth.interceptor';
import { UserData } from '../classes/user-data';
import { LoginService } from './login.service';
import { first } from 'rxjs';
import { PictureService } from './picture.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  uri: string = "http://localhost:8080/api/auth/register"

  constructor(
    protected http: HttpClient,
    protected loginSrv: LoginService,
    protected picsSrv: PictureService,
    private router: Router
  ) { }

  register(registerData: RegisterData) {
    this.http.post<{token: string}>(this.uri, registerData, {context: new HttpContext().set(BYPASS_AUTH, true)})
    .pipe(first())
    .subscribe(response => {
      let newUserData: UserData = new UserData(registerData.username, registerData.password)
      this.loginSrv.onLogin(newUserData)      
      this.router.navigate(['/'])
    })
  }

  validate() {
    this.http.post("http://localhost:8080/api/rank/create", {name: "Validated"}).pipe(first()).subscribe()
  }
}

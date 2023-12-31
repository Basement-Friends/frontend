import { HttpClient, HttpContext } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from '../classes/register-data';
import { BYPASS_AUTH } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  uri: string = "http://localhost:8080/api/auth/register"
  onRegister: EventEmitter<string> = new EventEmitter()

  constructor(
    protected http: HttpClient,
    private router: Router
  ) { }

  register(registerData: RegisterData) {
    this.http.post<{token: string}>(this.uri, registerData, {context: new HttpContext().set(BYPASS_AUTH, true)})
    .subscribe(response => {
        this.onRegister.emit(response.token)
        this.router.navigate(['/'])
        //this.http.get("http://localhost:8080/api/user").subscribe(res => console.log(res))
      })
  }
}

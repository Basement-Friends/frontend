import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../classes/user-data';
import { User } from '../classes/user';
import { Gender } from '../enums/gender';
import { BYPASS_AUTH } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  initialized: boolean = false

  authEndpoint: string = "http://localhost:8080/api/auth/login"
  context = {context: new HttpContext().set(BYPASS_AUTH, true)}

  isLoggedIn: boolean = false
  loggedUser$ = new BehaviorSubject<User | null | undefined>(undefined)

  onLogIn: EventEmitter<string> = new EventEmitter()
  onLogOut: EventEmitter<void> = new EventEmitter()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { 
  }

  init() {
    if(this.initialized === true)
      return
    this.initialized = true
    let username: string | null = localStorage.getItem('username')
    let password: string | null = localStorage.getItem('password')
    if(username !== null || password === null)    {
      let userData: UserData = new UserData(username!, password!)
      this.httpClient.post<{token: string}>(this.authEndpoint, userData, this.context)
      .subscribe(data => {
        let isSet: boolean = false
        let tmpUsr = new User(
          username!, "", "", "", Gender.Male
        )
        this.loggedUser$.next(tmpUsr)
        this.onLogIn.emit(data.token)
        isSet = true
        return isSet
    })
    }
  }

  login(user: UserData) {
    this.httpClient.post<{token: string}>(this.authEndpoint, {username: user.username, password: user.password}, this.context)
      .subscribe(data => {
        localStorage.setItem('username', user.username)
        localStorage.setItem('password', user.password)
        this.router.navigate(["/"])
        let tmpUsr = new User(
          user.username!, "", "", ""
        )
        this.loggedUser$.next(tmpUsr)
        this.onLogIn.emit(data.token)
      })
  }

  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    this.loggedUser$.next(null)
    this.onLogOut.emit()
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<any>(this.authEndpoint)
  }
}

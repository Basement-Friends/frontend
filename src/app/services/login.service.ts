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
  loggedEndpoint: string = "http://localhost:8080/api/user"
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
        this.onLogIn.emit(data.token)
        this.httpClient.get<User>(this.loggedEndpoint).subscribe(user => {
          user.profileImg = "/assets/defaultAvatar.png"
          this.loggedUser$.next(user)
          isSet = true
        })
        return isSet
    })
    }
  }

  login(userData: UserData) {
    this.httpClient.post<{token: string}>(this.authEndpoint, {username: userData.username, password: userData.password}, this.context)
      .subscribe(data => {
        localStorage.setItem('username', userData.username)
        localStorage.setItem('password', userData.password)
        this.onLogIn.emit(data.token)
        this.httpClient.get<User>(this.loggedEndpoint).subscribe(user => {
          user.profileImg = "/assets/defaultAvatar.png"
          this.loggedUser$.next(user)
          this.router.navigate(["/"])
        })
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

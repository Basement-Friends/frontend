import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../classes/user-data';
import { User } from '../classes/user';
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

  loggedUser$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(undefined)
  token$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined> (undefined)

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
        this.token$.next(data.token)
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
        console.log(data);
        localStorage.setItem('username', userData.username)
        localStorage.setItem('password', userData.password)
        this.token$.next(data.token)
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
    this.token$.next(undefined)
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<any>(this.authEndpoint)
  }
}

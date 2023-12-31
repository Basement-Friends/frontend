import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../classes/user-data';
import { User } from '../classes/user';
import { Gender } from '../enums/gender';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  initialized: boolean = false

  authEndpoint: string = "http://localhost:8080/api/auth/login"
  authToken: string = ""

  isLoggedIn: boolean = false
  loggedUser$ = new BehaviorSubject<User | null | undefined>(undefined)

  onLogIn: EventEmitter<string> = new EventEmitter()
  onLogOut: EventEmitter<void> = new EventEmitter()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { 
    if(this.initialized === true)
    return
    this.initialized = true
    let username: string | null = localStorage.getItem('username')
    let password: string | null = localStorage.getItem('password')
    if(username !== null || password === null)    {
      let userData: UserData = new UserData(username!, password!)
      this.httpClient.post<{token: string}>(this.authEndpoint, userData)
      .subscribe(data => {
        let isSet: boolean = false
        let tmpUsr = new User(
          username!, "", "", "", Gender.Male
        )
        this.loggedUser$.next(tmpUsr)
        console.log(data.token)
        this.onLogIn.emit(data.token)
        isSet = true
        return isSet
    })
    }
  }

  login(user: UserData) {
    this.httpClient.post<{token: string}>(this.authEndpoint, {username: user.username, password: user.password})
      .subscribe(data => {
        localStorage.setItem('username', user.username)
        localStorage.setItem('password', user.password)
        this.router.navigate(["/"])
        let tmpUsr = new User(
          user.username!, "", "", ""
        )
        this.loggedUser$.next(tmpUsr)
        this.onLogIn.emit(data.token)
        // this.httpClient.get("http://localhost:8080/api/user").subscribe(res => console.log(res))
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

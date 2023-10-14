import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../classes/user-data';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  initialized: boolean = false

  authEndpoint: string = "assets/mockApi/users.json"
  authToken: string = ""

  isLoggedIn: boolean = false
  loggedUser$ = new BehaviorSubject<User | null | undefined>(undefined)

  // onLogIn: EventEmitter<User> = new EventEmitter()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  init() {
    if(this.initialized === true)
      return
    this.initialized = true
    let username: string | null = localStorage.getItem('username')
    if(username !== null)
    {
      return this.httpClient.get<User[]>(this.authEndpoint).subscribe((data: User[]) => {
        data.forEach(element => {
          if(element.name === username)
          {
            this.loggedUser$.next(element)
            //this.onLogIn.emit(element)
            return true          
          }
          else
            return false
          });
        return false
      })
    }
    else
      return false
  }

  login(user: UserData){
    this.getUsers().subscribe(data => {
      data.forEach((element: any) => {
        if(element.name === user.username)
          if(element.password == user.password)
          {
            this.isLoggedIn = true
            localStorage.setItem('username', element.name)
            console.log("logging in as ", element)
            //this.onLogIn.emit()
            this.router.navigate(["/"])
            this.loggedUser$.next(element)
            return
          }
      })
    })      
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<any>(this.authEndpoint)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../classes/user-data';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authEndpoint: string = "assets/mockApi/users.json"
  authToken: string = ""

  isLoggedIn: boolean = false
  loggedUser: User | undefined

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(user: UserData){
    this.getUsers().subscribe(data => {
      data.forEach((element: any) => {
        console.log(element);
        if(element.name === user.username)
          if(element.password == user.password)
          {
            this.isLoggedIn = true
            this.loggedUser = element
            localStorage.setItem('username', element.username)
            this.router.navigate(["/"])
          }
      })
    })
      
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<any>(this.authEndpoint)
  }
}

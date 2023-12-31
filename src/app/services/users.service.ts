import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:8080/api/user"
  constructor(
    private http: HttpClient
  ) {   }

  getUsers() {
    console.log("getting users")
    return this.http.get(this.url).subscribe(user => {
      console.log(user)
    })
  }
}

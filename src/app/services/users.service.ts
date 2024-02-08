import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userUrl: string = "http://localhost:8080/api/user"
  gamerUrl: string = "http://localhost:8080/api/gamer/all"

  constructor(
    private http: HttpClient
  ) {   }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
  }

  getGamers(): Observable<User[]>{
    return this.http.get<User[]>(this.gamerUrl)
  }
}

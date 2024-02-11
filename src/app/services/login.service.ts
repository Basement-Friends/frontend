import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { UserData } from '../classes/user-data';
import { User } from '../classes/user';
import { BYPASS_AUTH } from '../interceptors/auth.interceptor';
import { PictureService } from './picture.service';

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
  loggedUser: WritableSignal<User | null | undefined> = signal(undefined)
  token$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined> (undefined)

  constructor(
    private httpClient: HttpClient,
    private pictureSrv: PictureService,
    private router: Router
  ) { 
  }

  onInit() {
    if(this.initialized === true)
      return
    this.initialized = true    
    let username: string | null = localStorage.getItem('username')
    let password: string | null = localStorage.getItem('password')

    this.pictureSrv.img.subscribe(img => {
      let user = this.loggedUser$.getValue()
      if(user === null || user === undefined)
        return
      let blob = new Blob([img], { type: 'image/jpg' });
      let url = window.URL.createObjectURL(blob);
      user.profileImg = url
    })

    if(username !== null || password === null)    {
      let userData: UserData = new UserData(username!, password!)
      this.logIn(userData)
    }
  }
  
  onLogin(userData: UserData) {
    this.logIn(userData)
  }

  private logIn(userData: UserData) {
    this.httpClient.post<{ token: string; }>(this.authEndpoint, userData, this.context)
      .subscribe(data => {
        let isSet: boolean = false;
        this.token$.next(data.token);
        this.httpClient.get<User>(this.loggedEndpoint).subscribe(user => {
          user.profileImg = "/assets/defaultAvatar.png";
          this.loadProfileImg(user);
          this.loggedUser$.next(user);
          localStorage.setItem('username', userData.username)
          localStorage.setItem('password', userData.password)
          this.router.navigate(["/"])
          isSet = true;
        });
        return isSet;
      });
  }

  private loadProfileImg(user: User) {
    this.pictureSrv.getPicture()
      .pipe(first())
      .subscribe(picture => {
        let blob = new Blob([picture], { type: 'image/jpg' });
        let url = window.URL.createObjectURL(blob);
        user.profileImg = url
      });
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

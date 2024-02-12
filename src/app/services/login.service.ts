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

  authUrl: string = "http://localhost:8080/api/auth/login"
  userUrl: string = "http://localhost:8080/api/user"
  context = {context: new HttpContext().set(BYPASS_AUTH, true)}

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  loggedUser$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(undefined)
  loggedUser = signal<User| null | undefined>(undefined)
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
    return this.logIn(userData)
  }

  private logIn(userData: UserData) {
    return this.httpClient.post<{ token: string; }>(this.authUrl, userData, this.context)
      .subscribe(data => {
        let isSet: boolean = false;
        this.token$.next(data.token);
        this.httpClient.get<User>(this.userUrl).subscribe(user => {
          user.profileImg = "/assets/defaultAvatar.png";
          this.loadProfileImg(user);
          localStorage.setItem('username', userData.username)
          localStorage.setItem('password', userData.password)
          this.loggedUser$.next(user);
          this.loggedUser.set(user)
          this.isLoggedIn$.next(true)
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

  changePassword(oldData: {oldPassword: string, newPassword: string, repeatPassword: string}) {
    return this.httpClient.put(`${this.userUrl}/changePassword`, oldData).pipe(first()).subscribe(e => console.log(e))
  }

  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    this.loggedUser$.next(null)
    this.token$.next(undefined)
    this.isLoggedIn$.next(false)
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<any>(this.authUrl)
  }
}

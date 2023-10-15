import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  private _isLoggedIn: boolean = false
  get isLoggedIn(){ return this._isLoggedIn }

  private _user: User | null | undefined = undefined

  get user(): User | null | undefined {
     return this._user
  }

  set user(user: User | null){
    this._user = user
  }

  constructor(
    protected loginSrv: LoginService,
    protected router: Router
  ){}

  ngOnInit(): void {
      this.loginSrv.init()
      this.loginSrv.onLogIn.subscribe(this.updateUser())
  }
    
  private updateUser() {
    this.loginSrv.loggedUser$.pipe(
      filter(user => user !== undefined),
      map(currentUser => {
        if (currentUser !== undefined)
          this.user = currentUser
      })
    ).subscribe()
  }

  toDashboard() {
    this.router.navigate([`/profile/${this.user?.name}`])
  }

  logIn(){
    this.router.navigate(["/login"])
  }

  register(){
    this.router.navigate(['/register'])
  }
}

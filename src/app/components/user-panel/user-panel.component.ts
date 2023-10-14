import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
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

  private _user: User | undefined = undefined

  get user(): User | undefined {
     return this._user
  }

  set user(user: User){
    this._user = user
  }

  constructor(
    protected loginSrv: LoginService,
    protected router: Router
  ){}

  ngOnInit(): void {
      this.loginSrv.init()
      this.loginSrv.loggedUser$.pipe(
        filter(user => user !== null && user !== undefined)
      )
      .subscribe(user => {
        console.log(user);
        if(user !== null && user !== undefined)
          this.user = user
      })
  }
    
  toDashboard() {
    this.router.navigate([`/profile/${this.user?.name}`])
  }

  logIn(){
    this.router.navigate(["/login"])
  }
}

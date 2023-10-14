import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  private _isLoggedIn: boolean = false
  get isLoggedIn(){ return this._isLoggedIn }

  constructor(
    protected loginSrv: LoginService,
    protected router: Router
  ){}

  ngOnInit(): void {
      this.loginSrv.init()
      this.loginSrv.onLogIn.subscribe(() => this._isLoggedIn = true)
  }

  
  logIn(){
    this.router.navigate(["/login"])
  }
}

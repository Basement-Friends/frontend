import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  constructor(
    protected loginSrv: LoginService,
    protected router: Router
  ){}

  logIn(){
    this.router.navigate(["/login"])
  }
}

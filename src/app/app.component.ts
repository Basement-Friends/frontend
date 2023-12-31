import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'basement-friends';

  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
      this.loginService.init()
  }

  backHome(){
    this.router.navigateByUrl("/")
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  loggedUser: User | null = null

  scrub: any

  constructor(
    private loginSrv: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.scrub = this.loginSrv.loggedUser$.pipe(
      filter(currentUser => currentUser !== undefined),
    ).subscribe({
      next: (user: User | null | undefined) =>
      {
        if(user !== undefined && user !== null)
          this.loggedUser = user
    }})
  }

  toSwiping() {
    this.router.navigate(["swipesetting"])
  }

}
